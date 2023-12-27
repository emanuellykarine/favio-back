import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorito from 'App/Models/Favorito'
import { DateTime } from 'luxon'


export default class FavoritosController {
  
  public async index({}: HttpContextContract) {
    return Favorito.all()
  }

  public async store({response, request}: HttpContextContract) {
    const {nome,url,importante}=request.body()
    if(nome==undefined || url==undefined|| importante==undefined){
      return response.status(400)
    }
    //criar favorito
    const newFavorito={nome,url,importante}
    Favorito.create(newFavorito)
    return response.status(201).send(newFavorito)
  }

  public async show({params, response}: HttpContextContract) {
    let favoritoEncontrado=await Favorito.findByOrFail('id',params.id)
    if (favoritoEncontrado == undefined)
    return response.status(404)
    return favoritoEncontrado
  }

  public async update({request, params, response}: HttpContextContract) {
    const {nome, url, importante}= request.body()
    let favoritoEncontrado=await Favorito.findByOrFail('id',params.id)
    if (!favoritoEncontrado)
      return response.status(404)
    favoritoEncontrado.nome=nome
    favoritoEncontrado.url=url
    favoritoEncontrado.importante=importante

    await favoritoEncontrado.save()
    await favoritoEncontrado.merge({updatedAt:DateTime.local()}).save()
    return response.status(200).send(favoritoEncontrado)
  }

  public async destroy({response, params}: HttpContextContract) {
    let favoritoEncontrado=await Favorito.findByOrFail('id',params.id)
  if (!favoritoEncontrado) {
    return response.status(404)
  } else {
    await favoritoEncontrado.delete()
    return response.status(204)
  }
  }
}
