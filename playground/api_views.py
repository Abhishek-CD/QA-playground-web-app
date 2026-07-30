from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json
import time

@csrf_exempt
def mock_api_response(request):
    try:
        data = json.loads(request.body.decode('utf-8')) if request.body else {}
    except Exception:
        data = {}

    status_code = int(data.get('status', request.GET.get('status', 200)))
    method = request.method
    
    response_payload = {
        'status_code': status_code,
        'method': method,
        'timestamp': time.strftime('%Y-%m-%d %H:%M:%S'),
        'request_data': data,
        'message': f'Mock response for status {status_code}',
    }

    if status_code == 200:
        response_payload['success'] = True
        response_payload['data'] = {'id': 101, 'user': 'qa_tester', 'role': 'Automation Engineer', 'active': True}
    elif status_code == 400:
        response_payload['success'] = False
        response_payload['error'] = 'Bad Request - Required fields missing in payload'
    elif status_code == 401:
        response_payload['success'] = False
        response_payload['error'] = 'Unauthorized - Invalid Bearer Token'
    elif status_code == 404:
        response_payload['success'] = False
        response_payload['error'] = 'Not Found - Resource ID does not exist'
    else:
        response_payload['success'] = False
        response_payload['error'] = 'Internal Server Error - Simulated 500 Exception'

    return JsonResponse(response_payload, status=status_code)

def tables_data_api(request):
    search = request.GET.get('search', '').lower()
    page = int(request.GET.get('page', 1))
    limit = int(request.GET.get('limit', 5))

    users = [
        {'id': 1, 'name': 'Alice Smith', 'email': 'alice@qa.io', 'role': 'SDET Lead', 'status': 'Active', 'department': 'Engineering'},
        {'id': 2, 'name': 'Bob Johnson', 'email': 'bob@qa.io', 'role': 'Automation Engineer', 'status': 'Active', 'department': 'Testing'},
        {'id': 3, 'name': 'Charlie Brown', 'email': 'charlie@qa.io', 'role': 'QA Analyst', 'status': 'Inactive', 'department': 'Product'},
        {'id': 4, 'name': 'Diana Prince', 'email': 'diana@qa.io', 'role': 'Performance Specialist', 'status': 'Active', 'department': 'DevOps'},
        {'id': 5, 'name': 'Ethan Hunt', 'email': 'ethan@qa.io', 'role': 'Security Tester', 'status': 'Pending', 'department': 'Security'},
        {'id': 6, 'name': 'Fiona Gallagher', 'email': 'fiona@qa.io', 'role': 'Manual Tester', 'status': 'Active', 'department': 'QA'},
        {'id': 7, 'name': 'George Clark', 'email': 'george@qa.io', 'role': 'Backend Tester', 'status': 'Inactive', 'department': 'Engineering'},
        {'id': 8, 'name': 'Hannah Abbott', 'email': 'hannah@qa.io', 'role': 'UI Automation Dev', 'status': 'Active', 'department': 'Testing'},
        {'id': 9, 'name': 'Ian Malcolm', 'email': 'ian@qa.io', 'role': 'API Specialist', 'status': 'Active', 'department': 'Backend'},
        {'id': 10, 'name': 'Julia Roberts', 'email': 'julia@qa.io', 'role': 'Mobile QA Lead', 'status': 'Active', 'department': 'Mobile'},
    ]

    if search:
        users = [u for u in users if search in u['name'].lower() or search in u['email'].lower() or search in u['role'].lower()]

    total = len(users)
    start = (page - 1) * limit
    end = start + limit
    paginated_users = users[start:end]

    return JsonResponse({
        'total': total,
        'page': page,
        'limit': limit,
        'total_pages': (total + limit - 1) // limit if limit > 0 else 1,
        'data': paginated_users
    })

def ajax_search_api(request):
    query = request.GET.get('q', '').lower()
    latency = float(request.GET.get('latency', 0.3))
    time.sleep(min(latency, 2.0))

    frameworks = [
        'Selenium WebDriver', 'Playwright Python', 'Playwright Node.js', 'Cypress.io',
        'WebDriverIO', 'Appium Mobile', 'Robot Framework', 'TestNG Java', 'JUnit 5',
        'PyTest Framework', 'Cucumber BDD', 'Karate DSL', 'Postman API', 'RestAssured Java'
    ]
    results = [f for f in frameworks if query in f.lower()] if query else frameworks[:5]
    return JsonResponse({'query': query, 'results': results})

def infinite_feed_api(request):
    page = int(request.GET.get('page', 1))
    items_per_page = 4
    items = []
    
    categories = ['Automation Tip', 'Selector Best Practice', 'Framework Architecture', 'Edge Case Warning']
    authors = ['Sarah QA', 'David SDET', 'Alex Tester', 'Elena Engineer']
    
    for i in range(1, items_per_page + 1):
        item_id = (page - 1) * items_per_page + i
        items.append({
            'id': item_id,
            'title': f'QA Practice Insight #{item_id}: Mastering Element Locators',
            'category': categories[item_id % len(categories)],
            'author': authors[item_id % len(authors)],
            'likes': item_id * 12 + 5,
            'timestamp': f'{item_id} hours ago',
            'content': f'Item #{item_id} - Always ensure your web elements have unambiguous attributes like id, data-testid, or data-qa for resilient test suites.'
        })
    return JsonResponse({'page': page, 'has_more': page < 8, 'items': items})

@csrf_exempt
def upload_file_api(request):
    if request.method == 'POST':
        files_info = []
        if request.FILES:
            for key, uploaded_file in request.FILES.items():
                files_info.append({
                    'name': uploaded_file.name,
                    'size': f'{uploaded_file.size / 1024:.1f} KB',
                    'content_type': uploaded_file.content_type
                })
        return JsonResponse({
            'success': True,
            'message': f'Successfully uploaded {len(files_info)} file(s)',
            'files': files_info
        })
    return JsonResponse({'success': False, 'message': 'Invalid request method'}, status=400)

def download_file_api(request, file_format):
    if file_format == 'csv':
        content = "ID,Name,Role,Status,Framework\n1,Alice,SDET Lead,Active,Selenium\n2,Bob,Automation Engineer,Active,Playwright\n3,Charlie,QA Tester,Inactive,Cypress\n"
        response = HttpResponse(content, content_type='text/csv')
        response['Content-Disposition'] = 'attachment; filename="qa_playground_data.csv"'
        return response
    elif file_format == 'json':
        content = json.dumps({
            "project": "QA Playground",
            "version": "2.5.0",
            "test_cases": 150,
            "modules": ["Forms", "Tables", "Alerts", "Dynamic", "E-Commerce"]
        }, indent=2)
        response = HttpResponse(content, content_type='application/json')
        response['Content-Disposition'] = 'attachment; filename="qa_playground_export.json"'
        return response
    elif file_format == 'txt':
        content = "QA Playground Automation Log File\n=================================\nLog ID: LOG-98421\nStatus: PASSED\nExecution Time: 4.12s\nTotal Tests Executed: 42\nAll selectors validated successfully.\n"
        response = HttpResponse(content, content_type='text/plain')
        response['Content-Disposition'] = 'attachment; filename="execution_log.txt"'
        return response
    elif file_format == 'pdf':
        content = "%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 1/Kids[3 0 R]>>endobj 3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Resources<<>>>>endobj\nxref\n0 4\n0000000000 65535 f \n0000000009 00000 n \n0000000052 00000 n \n0000000102 00000 n \ntrailer<</Size 4/Root 1 0 R>>\nstartxref\n178\n%%EOF"
        response = HttpResponse(content, content_type='application/pdf')
        response['Content-Disposition'] = 'attachment; filename="sample_test_report.pdf"'
        return response
    else:
        return HttpResponse("File format not supported", status=400)
