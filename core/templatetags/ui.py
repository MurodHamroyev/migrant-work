from django import template
from django.utils.html import format_html
from core.i18n import tr

register = template.Library()


@register.simple_tag(takes_context=True)
def t(context, key):
    return tr(getattr(context.get("request"), "lang", "ru"), key)


@register.simple_tag
def icon(name, cls=""):
    return format_html('<svg class="ic {}"><use href="#i-{}"/></svg>', cls, name)
