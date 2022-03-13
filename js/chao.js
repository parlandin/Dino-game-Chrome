import sprites from "./sprites.js"
import { contexto } from "./canvas.js"

class Chao  {
    spriteX = 120
    spriteY = 205
    largura = 766
    altura = 23
    x = 0
    y = 280

    atualiza(){
        const movimentoDoChao = 5
        const repetirEm = this.largura / 1.2
        const movimentacao = this.x - movimentoDoChao
        this.x = movimentacao  % repetirEm 
    }

    desenha(){
        contexto.drawImage(
            sprites,
            this.spriteX, this.spriteY, 
            this.largura, this.altura, 
            this.x, this.y, 
            this.largura, this.altura
        )
        contexto.drawImage(
            sprites,
            this.spriteX , this.spriteY, 
            this.largura, this.altura, 
            this.x + this.largura, this.y, 
            this.largura, this.altura
        )
    }
}

export default new Chao;