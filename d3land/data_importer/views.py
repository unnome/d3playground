from django.http import HttpResponse
from django.template import loader
import datetime

# Create your views here.

def index(request):
    now = datetime.datetime.now()
    template = loader.get_template("data_importer/importer.html")
    context = {}

    return HttpResponse(template.render(context, request))
