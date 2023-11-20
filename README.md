# Build an API with Django and Nextjs

This is a simple example of how to build an API with Django, React, and Docker. You can find the
article concerning this code here on my [blog](https://koladev.xyz/posts/django-nextjs-crud/).

## Starting with Django and React

First launch the API server.

```bash
cd django-api-nextjs
python3.11 -m venv venv
pip install -r requirements.txt

python manage.py migrate
python manage.py runserver
```

The API server will be available at `http://localhost:8000/`.

Then launch the React client.

```bash
cd menu-frontend
npm install
npm run dev
```

The React client will be available at `http://localhost:3000/`.

Feel free to open issues on the [GitHub repository](https://github.com/koladev32/django-api-nextjs) if you have any questions.
