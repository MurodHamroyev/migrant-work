from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from . import models as m

admin.site.register(m.User, UserAdmin)
for model in (m.Warehouse, m.Vacancy, m.VacancyPhoto, m.Application, m.Shift, m.DocumentFile,
              m.Notification, m.Problem, m.CompanyInfo, m.Certificate):
    admin.site.register(model)
