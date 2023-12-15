import { test } from '@japa/runner'

test.group('Atualizar favorito', () => {
  test('atualizar favorito', async ({client})=>{
    const resposta=await client.put('/favoritos/1').json(
      {'nome':'IFRN', 
      'url':'www.ifrn.edu.br', 
      'importante':false
    })
    resposta.assertStatus(200)
  })

})
