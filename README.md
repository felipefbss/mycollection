# Minha Coleção - Catálogo de Séries

## Integrantes

\- Felipe Fernando Baie dos Santos - RGM 11261104537  
\- Felipe Oliveira Duarte Lima - RGM 11261104680  
\- Murillo Malaquias de Oliveira Ribeiro - RGM 11261104546

## Variante

Tema: Séries  
App Django: series  
Model: Serie (titulo, plataforma, ano, avaliacao)

## Como rodar o backend (Django)

Na pasta raiz do projeto (onde está o manage.py), crie e ative o ambiente virtual:

```
python -m venv venv
venv\Scripts\activate          (Windows)
source venv/bin/activate       (Linux/Mac)
```

Instale as dependências, crie o banco e inicie o servidor:

```
pip install django django-cors-headers
python manage.py migrate
python manage.py runserver
```

O backend fica em http://localhost:8000.

Se o PowerShell bloquear o activate, use o Prompt de Comando (cmd).

## Como rodar o frontend (React)

Em outro terminal, a partir da pasta raiz do projeto:

```
cd frontend
npm install
npm run dev
```

Abra http://localhost:5173 no navegador.

## Observações

O banco (db.sqlite3) não vem junto com o projeto. O comando migrate cria um banco vazio. Para cadastrar séries, use o formulário da tela do React ou o admin do Django (python manage.py createsuperuser e depois http://localhost:8000/admin).

Backend e frontend precisam estar rodando ao mesmo tempo. Abra o frontend por localhost e não por 127.0.0.1, porque o CORS só libera http://localhost:5173.
