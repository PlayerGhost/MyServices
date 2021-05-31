import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PerguntasCategoria } from 'src/app/entidades/PerguntasCategoria';
import { Usuario } from 'src/app/entidades/usuario';
import { PerguntasMock } from 'src/app/mock/perguntasMock';
import { ProfissionaisService } from 'src/app/services/profissionais.service';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
  styleUrls: ['./profissionais.component.css']
})
export class ProfissionaisComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  user: Usuario
  profissionais: Usuario[]
  form: FormGroup
  perguntasMock: PerguntasMock
  cardsCount
  cardClickedHabilidades: String[]
  filtroCategoriaSelector: HTMLSelectElement
  profissionaisFiltro: Usuario[]

  constructor(private formBuilder: FormBuilder, private profissionaisService: ProfissionaisService) {
    this.profissionais = []
    this.perguntasMock = new PerguntasMock()
    this.cardsCount = 0
    this.cardClickedHabilidades = String[0]
  }

  ngOnInit(): void {
    //this.isLoggedIn$ = this.usersService.isLoggedIn();

    /*if (this.usersService.getLocalUser() != null) {
      this.user = this.usersService.getLocalUser()

      this.updateUserPlaylists()
    }*/

    this.form = this.formBuilder.group({
      "nome": new FormControl('', Validators.required),
      "sobrenome": new FormControl('', Validators.required),
      "email": new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      "cep": new FormControl('', Validators.required),
      "telefone": new FormControl('', Validators.required),
      "categoria": new FormControl('', Validators.required),
      "pergunta0": new FormControl('', Validators.required),
      "pergunta1": new FormControl('', Validators.required),
    });

    this.profissionaisService.getProfissionais().subscribe((profissionais: Usuario[]) => {
      this.profissionais = profissionais
      this.profissionaisFiltro = profissionais
    })

    this.filtroCategoriaSelector = <HTMLSelectElement>document.getElementById("categoriaFiltro")
  }

  submit() {

  }

  get nome() {
    return this.form.get('nome')
  }

  get sobrenome() {
    return this.form.get('sobrenome')
  }

  get email() {
    return this.form.get('email')
  }

  get cep() {
    return this.form.get('cep')
  }

  get telefone() {
    return this.form.get('telefone')
  }

  get categoria() {
    return this.form.get('categoria')
  }

  get pergunta0() {
    return this.form.get('pergunta0')
  }

  get pergunta1() {
    return this.form.get('pergunta1')
  }

  setCardClickedCategorias(habilidades: String[]) {
    this.cardClickedHabilidades = habilidades
  }

  getCategoriaPerguntasLabel(categoria: String) {
    for (let i = 0; i < this.perguntasMock.perguntas.length; i++) {
      if (categoria == this.perguntasMock.perguntas[i].categoria) {
        return this.perguntasMock.perguntas[i].label + ":"
      }
    }
  }

  getCategoriaPerguntas(categoria: String) {
    for (let i = 0; i < this.perguntasMock.perguntas.length; i++) {
      if (categoria == this.perguntasMock.perguntas[i].categoria) {
        return this.perguntasMock.perguntas[i].perguntas
      }
    }
  }

  formReset() {
    this.form.reset()
    this.categoria.setValue("Escolher categoria...")
  }

  getPerguntaIdIndex(pergunta) {
    return this.getCategoriaPerguntas(this.categoria.value).indexOf(pergunta)
  }

  getPerguntaIdIndexObject(pergunta) {
    if (this.getPerguntaIdIndex(pergunta) == 0) {
      return this.pergunta0
    } else {
      return this.pergunta1
    }
  }

  checkSelectCategory(categoria: string, habilidades: string[]) {
    for (let i = 0; i < habilidades.length; i++) {
      if (habilidades[i] == categoria) {
        return true
      }
    }

    return false
  }

  updateProfissionaisFiltro() {
  }
}
