from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.clickjacking import xframe_options_exempt

def home(request):
    return render(request, 'playground/home.html', {'active_page': 'home'})

def login_view(request):
    context = {'active_page': 'login'}
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        if username == 'admin' and password == 'admin123':
            context['status'] = 'success'
            context['message'] = 'Welcome back, Admin! Login Successful.'
        else:
            context['status'] = 'error'
            context['message'] = 'Invalid username or password. Please try again.'
    return render(request, 'playground/login.html', context)

def register_view(request):
    context = {'active_page': 'register'}
    if request.method == 'POST':
        first_name = request.POST.get('first_name', '')
        last_name = request.POST.get('last_name', '')
        context['status'] = 'success'
        context['message'] = f'Account for {first_name} {last_name} created successfully!'
    return render(request, 'playground/register.html', context)

def simple_form_view(request):
    return render(request, 'playground/simple_form.html', {'active_page': 'simple_form'})

def buttons_view(request):
    return render(request, 'playground/buttons.html', {'active_page': 'buttons'})

def alerts_view(request):
    return render(request, 'playground/alerts.html', {'active_page': 'alerts'})

def date_pickers_view(request):
    return render(request, 'playground/date_pickers.html', {'active_page': 'date_pickers'})

def tables_view(request):
    return render(request, 'playground/tables.html', {'active_page': 'tables'})

def dropdowns_view(request):
    return render(request, 'playground/dropdowns.html', {'active_page': 'dropdowns'})

def checkboxes_view(request):
    return render(request, 'playground/checkboxes.html', {'active_page': 'checkboxes'})

def radio_buttons_view(request):
    return render(request, 'playground/radio_buttons.html', {'active_page': 'radio_buttons'})

def progress_bars_view(request):
    return render(request, 'playground/progress_bars.html', {'active_page': 'progress_bars'})

def drag_drop_view(request):
    return render(request, 'playground/drag_drop.html', {'active_page': 'drag_drop'})

def mouse_actions_view(request):
    return render(request, 'playground/mouse_actions.html', {'active_page': 'mouse_actions'})

def keyboard_actions_view(request):
    return render(request, 'playground/keyboard_actions.html', {'active_page': 'keyboard_actions'})

def file_upload_view(request):
    return render(request, 'playground/file_upload.html', {'active_page': 'file_upload'})

def downloads_view(request):
    return render(request, 'playground/downloads.html', {'active_page': 'downloads'})

def frames_view(request):
    return render(request, 'playground/frames.html', {'active_page': 'frames'})

def windows_view(request):
    return render(request, 'playground/windows.html', {'active_page': 'windows'})

def authentication_view(request):
    return render(request, 'playground/authentication.html', {'active_page': 'authentication'})

def dynamic_elements_view(request):
    return render(request, 'playground/dynamic_elements.html', {'active_page': 'dynamic_elements'})

def ajax_view(request):
    return render(request, 'playground/ajax.html', {'active_page': 'ajax'})

def shadow_dom_view(request):
    return render(request, 'playground/shadow_dom.html', {'active_page': 'shadow_dom'})

def infinite_scroll_view(request):
    return render(request, 'playground/infinite_scroll.html', {'active_page': 'infinite_scroll'})

def ecommerce_view(request):
    return render(request, 'playground/ecommerce.html', {'active_page': 'ecommerce'})

def api_playground_view(request):
    return render(request, 'playground/api_playground.html', {'active_page': 'api_playground'})

def charts_view(request):
    return render(request, 'playground/charts.html', {'active_page': 'charts'})

def automation_challenges_view(request):
    return render(request, 'playground/automation_challenges.html', {'active_page': 'automation_challenges'})

def documentation_view(request):
    return render(request, 'playground/documentation.html', {'active_page': 'documentation'})

@xframe_options_exempt
def frame_embed_view(request, frame_id):
    return render(request, 'playground/frame_content.html', {'frame_id': frame_id})
