import BtnRepetir from "./btnRepetir.js"
import { contexto } from "./canvas.js"
import sprites from "./sprites.js"
import Dino from "./dino.js"
import Chao from "./chao.js"
import Cactos from "./cactos.js"


let frames = 0
let velocidade = 8
let num =parseInt(Math.random() * 5)



let score = {
    desenha(){
        contexto.fillStyle = "#000"
        contexto.font = "20px Arial"
        contexto.fillText(Dino.score, canvas.width - 100, 30)
        if(Dino.melhorPontuacao != 0){
            contexto.fillStyle = "#000"
            contexto.font = "20px Arial"
            contexto.fillText("HI: "+ Dino.melhorPontuacao, canvas.width - 200, 30)
        }
    }
}


// Telas

let telaAtiva = {};
function mudarParaTela(novaTela) {
    telaAtiva = novaTela
}

const Telas = {
    INICIO: {
        desenha(){
            Chao.desenha()
            Dino.desenha()
        },

        keyup(){
            mudarParaTela(Telas.JOGO)
            Dino.pular()
        },
        atualiza(){

        },
        mousedown(){
            mudarParaTela(Telas.JOGO)
            Dino.pular()
        }
    },

    JOGO: {
       keyup(){
            Dino.pular()
        }, 
        desenha(){
            Chao.desenha()
            Cactos.desenha()
            Dino.desenha()
            score.desenha()
        },

        atualiza(){
            Dino.atualiza(frames)
            Chao.atualiza()
            Cactos.atualiza(frames, Dino, velocidade)
        },
        mousedown(){
            
            Dino.pular()
        }
    },

    REINICIAR:{
        atualiza(){
        },
            
        desenha(){
            Chao.desenha()
            Cactos.desenha()
            Dino.desenha()
            BtnRepetir.desenha() 
        },
        mousedown(){
            mudarParaTela(Telas.INICIO)
            Cactos.gerarCactos = []
            velocidade = 8
            Dino.spriteInicial()
            Dino.score = 0
        }
    }
}



function loop() {
    contexto.clearRect(0,0,canvas.width,canvas.height)
    telaAtiva.atualiza()
    telaAtiva.desenha()
    /* dino.cair()
    dino.desenha()
    chao.desenha() */
    frames ++
    requestAnimationFrame(loop)
}

mudarParaTela(Telas.INICIO)
loop()

window.addEventListener("keydown", function(e){
   if(telaAtiva.keyup && e.keyCode == 38){
        telaAtiva.keyup() 
    } 
})


window.addEventListener("mousedown", function(e){
    if (e.button !== 0) return

    if(telaAtiva.mousedown){
        telaAtiva.mousedown()
    }
    console.log(e.button == 0)
})


