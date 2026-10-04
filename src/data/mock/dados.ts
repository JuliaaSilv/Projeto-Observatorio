import type { DashboardHero, Metric } from '../../types/dashboard'

export const dadosHero: DashboardHero = {
  title: 'Repositório de Dados e Estatísticas Abertas',
  description:
    'Consolidação e integração de bases federais, estaduais e municipais em um repositório centralizado, aberto para gestores, pesquisadores e cidadãos.',
  note:
    'Todos os microdados e séries temporais são disponibilizados em formatos abertos e em conformidade estrita com a LGPD.',
}

export interface DatasetItem {
  id: string
  titulo: string
  orgaoFonte: string
  periodicidade: 'Mensal' | 'Trimestral' | 'Anual' | 'Decenal'
  categoria: 'Emprego Formal' | 'Renda e Desigualdade' | 'Territórios e Demografia' | 'Empresas e Negócios'
  cobertura: string
  ultimaAtualizacao: string
  formatos: ('CSV' | 'JSON' | 'XLSX' | 'GeoJSON' | 'API')[]
  tamanho: string
  totalLinhas: string
  descricao: string
  conformidadeLgpd: string
}

export const datasetsCatalog: DatasetItem[] = [
  {
    id: 'caged-recife-mensal',
    titulo: 'Movimentação do Emprego Formal (Novo CAGED) por Bairro',
    orgaoFonte: 'Ministério do Trabalho e Emprego (MTE) / EMPREL',
    periodicidade: 'Mensal',
    categoria: 'Emprego Formal',
    cobertura: 'Recife (94 bairros)',
    ultimaAtualizacao: 'Agosto/2025',
    formatos: ['CSV', 'JSON', 'XLSX', 'API'],
    tamanho: '14.2 MB',
    totalLinhas: '48.200 registros',
    descricao:
      'Registros de admissões, demissões, saldo de postos formais com carteira assinada, desagregados por setor econômico (CNAE), gênero e faixa etária.',
    conformidadeLgpd: 'Dados agregados por setor e bairro; identificadores pessoais suprimidos.',
  },
  {
    id: 'rais-vinculos-ativos',
    titulo: 'Estoque de Vínculos Empregatícios e Estabelecimentos (RAIS)',
    orgaoFonte: 'Ministério do Trabalho e Emprego (MTE)',
    periodicidade: 'Anual',
    categoria: 'Emprego Formal',
    cobertura: 'Recife e Região Metropolitana',
    ultimaAtualizacao: '2024 (Ano-base 2023)',
    formatos: ['CSV', 'JSON', 'XLSX'],
    tamanho: '86.4 MB',
    totalLinhas: '124.800 registros',
    descricao:
      'Microdados estruturados de vínculos empregatícios ativos, remuneração média nominal e real, tempo de emprego e grau de instrução.',
    conformidadeLgpd: 'Aplicação de k-anonimato (k ≥ 5) para recortes territoriais específicos.',
  },
  {
    id: 'pnad-continua-trabalho',
    titulo: 'Indicadores Trimestrais de Força de Trabalho e Informalidade (PNADC)',
    orgaoFonte: 'Instituto Brasileiro de Geografia e Estatística (IBGE)',
    periodicidade: 'Trimestral',
    categoria: 'Renda e Desigualdade',
    cobertura: 'Recife (Capital)',
    ultimaAtualizacao: '2º Trimestre 2025',
    formatos: ['CSV', 'JSON', 'API'],
    tamanho: '9.8 MB',
    totalLinhas: '18.400 registros',
    descricao:
      'Taxa de desocupação geral e jovem, taxa de informalidade, trabalhadores por conta própria e rendimento médio real habitual.',
    conformidadeLgpd: 'Estatísticas amostrais ponderadas com coeficiente de variação aceitável.',
  },
  {
    id: 'censo-demografia-bairros',
    titulo: 'Malha Territorial e Perfil Demográfico dos Bairros (Censo)',
    orgaoFonte: 'IBGE / Prefeitura do Recife',
    periodicidade: 'Decenal',
    categoria: 'Territórios e Demografia',
    cobertura: '94 bairros e 6 RPAs do Recife',
    ultimaAtualizacao: '2024 (Censo 2022 consolidado)',
    formatos: ['CSV', 'GeoJSON', 'JSON'],
    tamanho: '32.1 MB',
    totalLinhas: '94 polígonos / 2.300 setores',
    descricao:
      'População residente por sexo e idade, domicílios particulares permanentes, densidade demográfica e limites geográficos georreferenciados.',
    conformidadeLgpd: 'Dado público censitário de domínio aberto.',
  },
  {
    id: 'empresas-ativas-recife',
    titulo: 'Cadastro de Contribuintes e Atividades Econômicas Municipais',
    orgaoFonte: 'Secretaria de Finanças / EMPREL',
    periodicidade: 'Mensal',
    categoria: 'Empresas e Negócios',
    cobertura: 'Município do Recife',
    ultimaAtualizacao: 'Agosto/2025',
    formatos: ['CSV', 'JSON', 'API'],
    tamanho: '21.5 MB',
    totalLinhas: '72.300 empresas',
    descricao:
      'Distribuição espacial de empresas ativas, Microempreendedores Individuais (MEI) e médias/grandes empresas por CNAE e bairro.',
    conformidadeLgpd: 'Dados cadastrais públicos de pessoas jurídicas sob a Lei de Acesso à Informação (LAI).',
  },
]

export interface DataTableRow {
  id: string
  periodo: string
  bairro: string
  rpa: string
  admissoes: number
  desligamentos: number
  saldo: number
  taxaInformalidade: string
  rendaMedia: string
}

export const previewTableData: DataTableRow[] = [
  {
    id: '1',
    periodo: '2025-06',
    bairro: 'Boa Viagem',
    rpa: 'RPA 6',
    admissoes: 1840,
    desligamentos: 1420,
    saldo: 420,
    taxaInformalidade: '22,4%',
    rendaMedia: 'R$ 5.120',
  },
  {
    id: '2',
    periodo: '2025-06',
    bairro: 'Santo Amaro',
    rpa: 'RPA 1',
    admissoes: 1120,
    desligamentos: 890,
    saldo: 230,
    taxaInformalidade: '41,2%',
    rendaMedia: 'R$ 2.190',
  },
  {
    id: '3',
    periodo: '2025-06',
    bairro: 'Bairro do Recife',
    rpa: 'RPA 1',
    admissoes: 980,
    desligamentos: 670,
    saldo: 310,
    taxaInformalidade: '24,0%',
    rendaMedia: 'R$ 4.950',
  },
  {
    id: '4',
    periodo: '2025-06',
    bairro: 'Várzea',
    rpa: 'RPA 4',
    admissoes: 730,
    desligamentos: 680,
    saldo: 50,
    taxaInformalidade: '39,1%',
    rendaMedia: 'R$ 2.250',
  },
  {
    id: '5',
    periodo: '2025-06',
    bairro: 'Ibura',
    rpa: 'RPA 6',
    admissoes: 310,
    desligamentos: 390,
    saldo: -80,
    taxaInformalidade: '52,8%',
    rendaMedia: 'R$ 1.380',
  },
  {
    id: '6',
    periodo: '2025-06',
    bairro: 'Afogados',
    rpa: 'RPA 5',
    admissoes: 620,
    desligamentos: 580,
    saldo: 40,
    taxaInformalidade: '45,3%',
    rendaMedia: 'R$ 1.890',
  },
  {
    id: '7',
    periodo: '2025-06',
    bairro: 'Casa Forte',
    rpa: 'RPA 3',
    admissoes: 540,
    desligamentos: 410,
    saldo: 130,
    taxaInformalidade: '19,5%',
    rendaMedia: 'R$ 6.450',
  },
  {
    id: '8',
    periodo: '2025-06',
    bairro: 'Casa Amarela',
    rpa: 'RPA 3',
    admissoes: 490,
    desligamentos: 530,
    saldo: -40,
    taxaInformalidade: '43,6%',
    rendaMedia: 'R$ 1.980',
  },
  {
    id: '9',
    periodo: '2025-06',
    bairro: 'Pina',
    rpa: 'RPA 6',
    admissoes: 810,
    desligamentos: 690,
    saldo: 120,
    taxaInformalidade: '42,0%',
    rendaMedia: 'R$ 3.200',
  },
  {
    id: '10',
    periodo: '2025-06',
    bairro: 'Graças',
    rpa: 'RPA 3',
    admissoes: 510,
    desligamentos: 430,
    saldo: 80,
    taxaInformalidade: '20,8%',
    rendaMedia: 'R$ 5.890',
  },
]

export interface BoletimItem {
  id: string
  titulo: string
  tipo: 'Boletim Trimestral' | 'Nota Técnica' | 'Diagnóstico Especial' | 'Relatório Anual'
  dataPublicacao: string
  paginas: number
  resumo: string
  arquivo: string
  destaque: boolean
}

export const boletinsAnaliticos: BoletimItem[] = [
  {
    id: 'bol-2025-q2',
    titulo: 'Boletim de Conjuntura Econômica e Emprego do Recife - 2º Trimestre 2025',
    tipo: 'Boletim Trimestral',
    dataPublicacao: 'Julho de 2025',
    paginas: 28,
    resumo:
      'Panorama dos saldos do CAGED, expansão do setor de serviços no Porto Digital e desaceleração do desemprego entre adultos no município.',
    arquivo: 'boletim-recife-2025-q2.pdf',
    destaque: true,
  },
  {
    id: 'nota-juventude-2025',
    titulo: 'Diagnóstico da Inserção Produtiva da Juventude Periférica no Recife',
    tipo: 'Diagnóstico Especial',
    dataPublicacao: 'Maio de 2025',
    paginas: 44,
    resumo:
      'Estudo empírico sobre a transição escola-trabalho e barreiras de acesso ao primeiro emprego nas RPAs 2, 5 e 6.',
    arquivo: 'diagnostico-desemprego-jovem-recife.pdf',
    destaque: true,
  },
  {
    id: 'relatorio-renda-2024',
    titulo: 'Relatório Anual de Desigualdades Territoriais e Rendimento do Trabalho',
    tipo: 'Relatório Anual',
    dataPublicacao: 'Março de 2025',
    paginas: 56,
    resumo:
      'Avaliação dos coeficientes de Gini interbairros, massa salarial e o impacto da retomada do emprego na pobreza urbana.',
    arquivo: 'relatorio-anual-desigualdade-2024.pdf',
    destaque: false,
  },
  {
    id: 'nota-informalidade',
    titulo: 'Nota Técnica: Informalidade Urbana e Inclusão Previdenciária no Recife',
    tipo: 'Nota Técnica',
    dataPublicacao: 'Fevereiro de 2025',
    paginas: 16,
    resumo:
      'Mapeamento dos polos de comércio informal e estratégias municipais de formalização via MEI no Centro e bairros do subúrbio.',
    arquivo: 'nota-tecnica-informalidade.pdf',
    destaque: false,
  },
]

export const dadosMetrics: Metric[] = [
  {
    id: 'bases-integradas',
    title: 'Bases públicas integradas',
    value: '5 fontes',
    variation: 'MTE · IBGE · PCR',
    trend: 'positive',
    icon: 'building-2',
  },
  {
    id: 'downloads-mes',
    title: 'Acessos e downloads',
    value: '18.420',
    variation: '+24,8% este mês',
    trend: 'positive',
    icon: 'users',
  },
  {
    id: 'frequencia-atualizacao',
    title: 'Frequência de atualização',
    value: 'Trimestral / Mensal',
    variation: 'Sincronizada',
    trend: 'neutral',
    icon: 'building-2',
  },
  {
    id: 'cobertura-territorial',
    title: 'Granularidade dos dados',
    value: 'Por Bairro / RPA',
    variation: '100% da cidade',
    trend: 'positive',
    icon: 'badge-cent',
  },
]
