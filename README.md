# MigrantWork на Django (v2)

Своя платформа на Django, без Supabase и внешних сервисов. База: SQLite или PostgreSQL на вашем сервере.
Документы и фото смен лежат в папке `private/` и открываются только через проверку прав. Публичные фото (склады, сертификаты) лежат в `media/`.

## Обновление со старой версии
Модели изменились, поэтому удалите `db.sqlite3` и папку `core/migrations/` (если они есть), затем:

```bash
pip install -r requirements.txt
python manage.py makemigrations core
python manage.py migrate
python manage.py createsuperuser     # username = ваш email; это администратор
python manage.py seed_demo           # демо-склады и вакансии (по желанию)
python manage.py runserver
```

## Роли
| Роль | Как создаётся | Что видит |
|---|---|---|
| Работник | регистрация на `/register/` | свой кабинет на 5 языках |
| Администратор | `createsuperuser` | всё: `/panel/` |
| Менеджер | админ: Панель → Менеджеры и операторы | только сотрудников своего склада, документы, смены, опыт |
| Оператор | там же | поиск по имени и фамилии, пакет документов, ZIP |

## Где что менять
- Тексты интерфейса работника на ru/uz/tg/ky/ko: `core/i18n.py`
- Списки документов для патента/ВНЖ/РФ/EAC: `core/utils.py` (словарь `LEGAL`)
- Страна и телефонные коды: `core/countries.py`
- Таймер между отметками смены (10 часов): `COOLDOWN` в `core/views.py`

## PostgreSQL и продакшен
Переменные `DB_NAME, DB_USER, DB_PASSWORD, DB_HOST`, раскомментировать `psycopg` в requirements.txt.
`DEBUG=0`, `SECRET_KEY`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS=https://домен`; `collectstatic`; `gunicorn config.wsgi`; `media/` отдавайте через nginx, а `private/` не публикуйте.
