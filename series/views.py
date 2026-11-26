import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from .models import Serie


@csrf_exempt
def api_series(request):
    if request.method == "POST":
        dados = json.loads(request.body)

        try:
            avaliacao = float(dados["avaliacao"])
            ano = int(dados["ano"])
        except (KeyError, ValueError, TypeError):
            return JsonResponse(
                {"erro": "Preencha ano e avaliação com números válidos."},
                status=400,
            )

        if avaliacao < 0 or avaliacao > 10:
            return JsonResponse(
                {"erro": "A avaliação deve estar entre 0 e 10."},
                status=400,
            )

        if ano < 1900 or ano > 2026:
            return JsonResponse(
                {"erro": "O ano deve estar entre 1900 e 2026."},
                status=400,
            )

        serie = Serie.objects.create(
            titulo=dados["titulo"],
            plataforma=dados["plataforma"],
            ano=ano,
            avaliacao=avaliacao,
        )
        return JsonResponse({"id": serie.id}, status=201)

    series = list(Serie.objects.values())
    return JsonResponse(series, safe=False)


def resumo_series(request):
    series = Serie.objects.all()
    total = len(series)

    if total == 0:
        return JsonResponse({"total": 0, "media_avaliacao": 0, "melhor": ""})

    soma = 0
    melhor_serie = series[0]

    for s in series:
        soma += s.avaliacao
        if s.avaliacao > melhor_serie.avaliacao:
            melhor_serie = s

    media = round(soma / total, 2)

    return JsonResponse(
        {
            "total": total,
            "media_avaliacao": media,
            "melhor": melhor_serie.titulo,
        }
    )