import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

let favoritos=[{
  id:1, nome:'Google',
  url:'http://www.google.com.br',
  importante:true
}]

export default class FavoritosController {
  
  public async index({}: HttpContextContract) {
    return favoritos
  }

  public async store({response, request}: HttpContextContract) {
    const {nome,url,importante}=request.body()
    if(nome==undefined || url==undefined|| importante==undefined){
      return response.status(400)
    }
    //criar favorito
    const newFavorito={id:favoritos.length+1,nome,url,importante}
    favoritos.push(newFavorito)
    return response.status(201).send(newFavorito)
  }

  public async show({params, response}: HttpContextContract) {
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (favoritoEncontrado == undefined)
    return response.status(404)
    return favoritoEncontrado
  }

  public async update({request, params, response}: HttpContextContract) {
    const {nome, url, importante}= request.body()
    let favoritoEncontrado = favoritos.find((favorito) => favorito.id == params.id)
    if (!favoritoEncontrado)
      return response.status(404)
    favoritoEncontrado.nome=nome
    favoritoEncontrado.url=url
    favoritoEncontrado.importante=importante

    favoritos[params.id]=favoritoEncontrado
    return response.status(200).send(favoritoEncontrado)
  }

  public async destroy({response, params}: HttpContextContract) {
    const favoritoIndex = favoritos.findIndex((favorito) => favorito.id == params.id);
  if (favoritoIndex !== -1) {
    favoritos.splice(favoritoIndex, 1);
    return response.status(200).send({ message: 'Favorito deletado com sucesso' });
  } else {
    return response.status(400).send({ message: 'Favorito inexistente' });
  }
  }
}
