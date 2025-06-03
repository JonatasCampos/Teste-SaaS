const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rffwydkwqvuxppkmewtc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZnd5ZGt3cXZ1eHBwa21ld3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTU0NjAsImV4cCI6MjA2NDQ5MTQ2MH0.vE1kLxN__C12j-yRhI-gk3Z6gOfJi6q157J5dGD2nUg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTestTable() {
  // Verificando se conseguimos buscar dados da tabela
  const { data, error } = await supabase
    .from('test_customers')
    .select('*')
    .limit(1);

  if (error && error.code === 'PGRST204') {
    console.log('A tabela ainda não existe. Por favor, crie a tabela primeiro usando o SQL Editor do Supabase:');
    console.log(`
      CREATE TABLE test_customers (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        plan_type VARCHAR(50) CHECK (plan_type IN ('free', 'basic', 'premium')),
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW())
      );

      -- Habilitando Row Level Security (RLS)
      ALTER TABLE test_customers ENABLE ROW LEVEL SECURITY;

      -- Política para leitura (usuários autenticados podem ler todos os registros)
      CREATE POLICY "test_customers_select_policy"
      ON test_customers FOR SELECT
      TO authenticated
      USING (true);

      -- Política para inserção/atualização (usuários autenticados podem criar/atualizar registros)
      CREATE POLICY "test_customers_all_policy"
      ON test_customers FOR ALL
      TO authenticated
      USING (true)
      WITH CHECK (true);
    `);
    return;
  }

  // Se a tabela existir, tenta inserir os dados de teste
  const { error: insertError } = await supabase
    .from('test_customers')
    .insert([
      {
        name: 'Cliente Teste 1',
        email: 'teste1@exemplo.com',
        phone: '+5511999999991',
        plan_type: 'basic'
      },
      {
        name: 'Cliente Teste 2',
        email: 'teste2@exemplo.com',
        phone: '+5511999999992',
        plan_type: 'premium'
      },
      {
        name: 'Cliente Teste 3',
        email: 'teste3@exemplo.com',
        phone: '+5511999999993',
        plan_type: 'free'
      }
    ]);

  if (error) {
    console.error('Erro ao criar tabela de teste:', error)
    return
  }

  console.log('Tabela de teste criada com sucesso!')

  // Buscando os dados inseridos para confirmar
  const { data: customers, error: selectError } = await supabase
    .from('test_customers')
    .select('*')

  if (selectError) {
    console.error('Erro ao buscar dados:', selectError)
    return
  }

  console.log('Dados inseridos:', customers)
}

createTestTable()
