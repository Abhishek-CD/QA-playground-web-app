from django.urls import path
from . import views, api_views

urlpatterns = [
    # Page Routes
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('simple-form/', views.simple_form_view, name='simple_form'),
    path('buttons/', views.buttons_view, name='buttons'),
    path('alerts/', views.alerts_view, name='alerts'),
    path('date-pickers/', views.date_pickers_view, name='date_pickers'),
    path('tables/', views.tables_view, name='tables'),
    path('dropdowns/', views.dropdowns_view, name='dropdowns'),
    path('checkboxes/', views.checkboxes_view, name='checkboxes'),
    path('radio-buttons/', views.radio_buttons_view, name='radio_buttons'),
    path('progress-bars/', views.progress_bars_view, name='progress_bars'),
    path('drag-drop/', views.drag_drop_view, name='drag_drop'),
    path('mouse-actions/', views.mouse_actions_view, name='mouse_actions'),
    path('keyboard-actions/', views.keyboard_actions_view, name='keyboard_actions'),
    path('file-upload/', views.file_upload_view, name='file_upload'),
    path('downloads/', views.downloads_view, name='downloads'),
    path('frames/', views.frames_view, name='frames'),
    path('windows/', views.windows_view, name='windows'),
    path('authentication/', views.authentication_view, name='authentication'),
    path('dynamic-elements/', views.dynamic_elements_view, name='dynamic_elements'),
    path('ajax/', views.ajax_view, name='ajax'),
    path('shadow-dom/', views.shadow_dom_view, name='shadow_dom'),
    path('infinite-scroll/', views.infinite_scroll_view, name='infinite_scroll'),
    path('ecommerce/', views.ecommerce_view, name='ecommerce'),
    path('api-playground/', views.api_playground_view, name='api_playground'),
    path('charts/', views.charts_view, name='charts'),
    path('automation-challenges/', views.automation_challenges_view, name='automation_challenges'),
    path('documentation/', views.documentation_view, name='documentation'),

    # Frame Embed Target Helper View
    path('frame-embed/<str:frame_id>/', views.frame_embed_view, name='frame_embed'),

    # API & Download Routes
    path('api/mock-response/', api_views.mock_api_response, name='api_mock_response'),
    path('api/tables-data/', api_views.tables_data_api, name='api_tables_data'),
    path('api/ajax-search/', api_views.ajax_search_api, name='api_ajax_search'),
    path('api/infinite-feed/', api_views.infinite_feed_api, name='api_infinite_feed'),
    path('api/upload-handler/', api_views.upload_file_api, name='api_upload_handler'),
    path('api/download/<str:file_format>/', api_views.download_file_api, name='api_download_file'),
]
