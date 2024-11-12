export class Agendar {
  constructor (page) {
    this.almocoHorario = '53';
    this.jantaHorario = '54';
    this.refeicaoAlmoco = '2';
    this.refeicaoJanta = '3';
    this.page = page;
  }

  async almoco(date) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.page.locator('input[type=text]').fill('');
    await this.page.locator('input[type=text]').fill(date);
    await this.page.waitForSelector('select#formulario\\:tipo_refeicao');
    await this.page.select('select#formulario\\:tipo_refeicao', this.refeicaoAlmoco);
    await this.page.locator('select#formulario\\:horario_agendado').click();
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.page.select('select#formulario\\:horario_agendado', this.almocoHorario);
    await this.page.locator('#formulario\\:cadastrar_agendamento_bt').click();
    await this.page.waitForNavigation()

    let errorExists = await this.page.evaluate(() => {
      return document.querySelector('ul.erros') !== null;
    });

    if (!errorExists) console.log(`O agendamento do almoço foi realizado com sucesso para o dia ${date[0]}${date[1]}/${date[2]}${date[3]}.`)
    else {
      console.log(`Não foi possível agendar o almoço no dia ${date[0]}${date[1]}/${date[2]}${date[3]}.`)
      exec('cd screenshots && erro.png');
    }
  }

  async janta(date) {
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.page.locator('input[type=text]').fill('');
    await this.page.locator('input[type=text]').fill(date);
    await this.page.waitForSelector('select#formulario\\:tipo_refeicao');
    await this.page.select('select#formulario\\:tipo_refeicao', this.refeicaoJanta);
    await this.page.locator('select#formulario\\:horario_agendado').click();
    await new Promise(resolve => setTimeout(resolve, 500));
    await this.page.select('select#formulario\\:horario_agendado', this.jantaHorario);
    await this.page.locator('#formulario\\:cadastrar_agendamento_bt').click();
    await this.page.waitForNavigation()

    let errorExists = await this.page.evaluate(() => {
      return document.querySelector('ul.erros') !== null;
    });

    if (!errorExists) console.log(`O agendamento do jantar foi realizado com sucesso para o dia ${date[0]}${date[1]}/${date[2]}${date[3]}.`)
    else {
      console.log(`Não foi possível agendar o jantar no dia ${date[0]}${date[1]}/${date[2]}${date[3]}.`)
      exec('cd screenshots && erro.png');
    }
  }
}