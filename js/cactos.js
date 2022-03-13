import sprites from "./sprites.js"
import { contexto } from "./canvas.js"

class Cactos  {
    listaDeCactos = [
        {
        spriteX: 627,
        spriteY: 111,
        largura: 45,
        altura: 52,
        x: 900,
        y: 241,
    },
    {
        spriteX: 578,
        spriteY: 111,
        largura: 24,
        altura: 50,
        x: 900,
        y: 241
    },
    {
        spriteX: 530,
        spriteY: 111,
        largura: 48,
        altura: 50,
        x: 900,
        y: 241
    },
    {
        spriteX: 431,
        spriteY: 111,
        largura: 62,
        altura: 37,
        x: 900,
        y: 258
    },
    {
        spriteX: 480,
        spriteY: 111,
        largura: 30,
        altura: 38,
        x: 900,
        y: 258
    },
    {
        spriteX: 512,
        spriteY: 111,
        largura: 16,
        altura: 38,
        x: 900,
        y: 258
    }]

    gerarCactos = [/* { x: 900, randomCactos: 3} */]
    desenha(){
        this.gerarCactos.forEach((par) => {
            let i = par.randomCactos


            contexto.drawImage(
                sprites,
                this.listaDeCactos[i].spriteX,
                this.listaDeCactos[i].spriteY, 
                this.listaDeCactos[i].largura, 
                this.listaDeCactos[i].altura, 
                par.x, 
                this.listaDeCactos[i].y, 
                this.listaDeCactos[i].largura,
                this.listaDeCactos[i].altura
            )
            
        })

    }

    temColisao(par, Dino){
        let cactoLagura = this.listaDeCactos[par.randomCactos].largura 
        let cactoY  = this.listaDeCactos[par.randomCactos].y
        if(Dino.x < par.x + cactoLagura && Dino.x + Dino.largura -4 >= par.x && Dino.y + Dino.altura -10 >= cactoY){
           return true

        }
    }

    tempoInserirCacto = 0
    
    //solução temporaria
    atualiza(frames, Dino, velocidade, mudarParaTela, Telas){
        if(this.tempoInserirCacto == 0){
            this.tempoInserirCacto = 25 + Math.floor(Math.random() * 30)
            let randomCactos = parseInt(Math.random()* 6)
            this.gerarCactos.push({x:900, randomCactos})
        }
        else{
            this.tempoInserirCacto--
        } 

        this.gerarCactos.forEach((par) => {
            par.x -= velocidade            
            
            if(this.temColisao(par, Dino)){
                if(Dino.score > Dino.melhorPontuacao){
                    Dino.melhorPontuacao = Dino.score
                }
                mudarParaTela(Telas.REINICIAR)
            } 

            if(par.x + this.largura < 0){
                this.gerarCactos.shift()
            }
        })
        const aumentarVelocidade = frames % 600 == 0
            if(aumentarVelocidade){
                velocidade++
            }
    }
}

export default new Cactos;