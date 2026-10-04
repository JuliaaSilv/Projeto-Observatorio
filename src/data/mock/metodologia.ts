import type { DashboardHero } from '../../types/dashboard'

export const metodologiaHero: DashboardHero = {
  title: 'Metodologia, Governança e Transparência',
  description:
    'Detalhamento conceitual, critérios de compatibilização de dados, conformidade com a LGPD e alinhamento com os Objetivos de Desenvolvimento Sustentável (ODS).',
  note:
    'O Observatório foi concebido para transformar registros administrativos e amostras estatísticas em evidências sólidas para o planejamento urbano do Recife.',
}

export interface OdsAlignment {
  numero: number
  titulo: string
  cor: string
  descricao: string
  metasVinculadas: string[]
}

export const odsList: OdsAlignment[] = [
  {
    numero: 1,
    titulo: 'Erradicação da Pobreza',
    cor: '#e5243b',
    descricao:
      'Garantir a identificação das famílias e territórios em situação de maior vulnerabilidade econômica no Recife, subsidiando programas municipais de transferência de renda e assistência produtiva.',
    metasVinculadas: [
      'Meta 1.2: Reduzir pela metade a proporção de pessoas que vivem na pobreza em todas as suas dimensões.',
      'Meta 1.3: Implementar medidas e sistemas de proteção social apropriados no nível municipal.',
    ],
  },
  {
    numero: 8,
    titulo: 'Trabalho Decente e Crescimento Econômico',
    cor: '#a21942',
    descricao:
      'Promover políticas orientadas para o desenvolvimento que apoiem as atividades produtivas, geração de trabalho decente, empreendedorismo, criatividade e inovação no Recife e polo tecnológico.',
    metasVinculadas: [
      'Meta 8.5: Alcançar o emprego pleno e produtivo e trabalho decente para todas as mulheres e homens, inclusive para os jovens.',
      'Meta 8.6: Reduzir substancialmente a proporção de jovens sem emprego, educação ou formação.',
    ],
  },
  {
    numero: 10,
    titulo: 'Redução das Desigualdades',
    cor: '#dd1367',
    descricao:
      'Superar a acentuada segregação socioespacial entre os bairros da Zona Norte/Sul e as áreas periféricas do Recife, oferecendo dados transparentes para políticas redistributivas.',
    metasVinculadas: [
      'Meta 10.1: Sustentar o crescimento da renda dos 40% mais pobres da população a uma taxa maior que a média.',
      'Meta 10.2: Empoderar e promover a inclusão social, econômica e política de todos, independentemente do território de residência.',
    ],
  },
]

export interface IndicadorMetodologia {
  nome: string
  sigla: string
  fonte: string
  periodicidade: string
  formula: string
  definicao: string
  desagregacao: string
}

export const dicionarioIndicadores: IndicadorMetodologia[] = [
  {
    nome: 'Taxa de Desocupação / Desemprego',
    sigla: 'TD',
    fonte: 'PNAD Contínua / IBGE com calibração municipal',
    periodicidade: 'Trimestral',
    formula: 'TD = (População Desocupada ÷ Força de Trabalho Total) × 100',
    definicao:
      'Percentual de pessoas na força de trabalho (com 14 anos ou mais) que estavam sem trabalho na semana de referência, mas estavam disponíveis e tomaram alguma providência efetiva para conseguir trabalho.',
    desagregacao: 'Município, RPA, Gênero, Faixa Etária',
  },
  {
    nome: 'Taxa de Desemprego Juvenil (18 a 24 anos)',
    sigla: 'TDJ',
    fonte: 'PNAD Contínua / Censo Demográfico',
    periodicidade: 'Trimestral / Estimativa Semestral',
    formula: 'TDJ = (Jovens 18-24 Desocupados ÷ Força de Trabalho Jovem 18-24) × 100',
    definicao:
      'Mede a vulnerabilidade de inserção profissional dos jovens no início da trajetória laboral, com destaque para a discrepância entre territórios periféricos e bairros centrais.',
    desagregacao: 'Município, Bairro e RPA',
  },
  {
    nome: 'Taxa de Informalidade',
    sigla: 'TINF',
    fonte: 'IBGE / PNAD Contínua',
    periodicidade: 'Trimestral',
    formula: 'TINF = (Empregados sem carteira + Trabalhadores por conta própria sem CNPJ + Familiares auxiliares) ÷ Total Ocupados × 100',
    definicao:
      'Proporção de trabalhadores ocupados em postos de trabalho desprovidos de proteção social, vínculo celetista ou registro formal empresarial.',
    desagregacao: 'Município, RPA, Setor de Atividade Econômica',
  },
  {
    nome: 'Saldo Líquido de Emprego Formal (CAGED)',
    sigla: 'SCAGED',
    fonte: 'Novo CAGED / Ministério do Trabalho e Emprego',
    periodicidade: 'Mensal',
    formula: 'Saldo = Total de Admissões Formais - Total de Desligamentos Formais',
    definicao:
      'Fluxo líquido de criação ou destruição de postos formais de trabalho com contrato CLT no município do Recife.',
    desagregacao: 'Bairro, Setor de Atividade (CNAE), Faixa Etária e Escolaridade',
  },
  {
    nome: 'Rendimento Médio Real Habitual do Trabalho',
    sigla: 'RMRH',
    fonte: 'PNAD Contínua / RAIS deflacionada pelo IPCA',
    periodicidade: 'Trimestral / Anual',
    formula: 'Rendimento Médio = ∑ Rendimentos Nominais ÷ Total de Ocupados Remunerados × (IPCA_ref ÷ IPCA_t)',
    definicao:
      'Média aritmética dos rendimentos do trabalho principal e secundário habitualmente recebidos no mês de referência, expressos a preços constantes do último período.',
    desagregacao: 'Município, Bairro, Gênero e Grau de Instrução',
  },
]

export interface ProtocoloLgpd {
  pilar: string
  descricao: string
  acaoPratica: string
}

export const protocolosLgpd: ProtocoloLgpd[] = [
  {
    pilar: 'Agregação Estatística e K-Anonimato',
    descricao:
      'Para preservar a privacidade em escalas intramunicipais (bairros e setores censitários), nenhuma célula com menos de 5 observações (k < 5) é divulgada de forma isolada.',
    acaoPratica: 'Supressão automática de células ou agregação na RPA correspondente.',
  },
  {
    pilar: 'Pseudonimização e Supressão de Chaves Diretas',
    descricao:
      'Dados de bases administrativas (como CAGED e RAIS) passam por rotina de limpeza de identificadores como CPF, NIS, nome e endereços completos antes da ingestão.',
    acaoPratica: 'Substituição por identificadores de chave geográfica (ID do Bairro / Código IBGE).',
  },
  {
    pilar: 'Conformidade com a LAI e LGPD (Art. 7º, IV)',
    descricao:
      'O tratamento de dados pessoais no Observatório é realizado com base na realização de estudos por órgão de pesquisa e interesse público na gestão de políticas econômicas.',
    acaoPratica: 'Auditoria de integridade e termo de uso aberto sob licença Creative Commons CC-BY 4.0.',
  },
]

export interface ParceiroInstitucional {
  nome: string
  tipo: string
  papel: string
}

export const parceirosInstitucionais: ParceiroInstitucional[] = [
  {
    nome: 'Universidade Federal de Pernambuco (UFPE)',
    tipo: 'Acadêmico / Pesquisa',
    papel: 'Cooperação técnica em econometria espacial, validação de modelos e formulação de indicadores.',
  },
  {
    nome: 'Porto Digital',
    tipo: 'Polo Tecnológico e Inovação',
    papel: 'Compartilhamento de demandas de competências em tecnologia e mapeamento da economia criativa.',
  },
  {
    nome: 'EMPREL (Empresa Municipal de Informática)',
    tipo: 'Setor Público Municipal',
    papel: 'Infraestrutura de dados públicos, geoprocessamento da base cadastral e segurança da informação.',
  },
  {
    nome: 'Secretaria de Desenvolvimento Econômico (SEDEC)',
    tipo: 'Gestão Pública Municipal',
    papel: 'Direcionamento estratégico e aplicação das evidências na formulação de políticas municipais.',
  },
  {
    nome: 'Agência Estadual Condepe/Fidem',
    tipo: 'Instituto de Planejamento',
    papel: 'Alinhamento dos recortes metropolitanos e compatibilização de dados cartográficos e censitários.',
  },
]
