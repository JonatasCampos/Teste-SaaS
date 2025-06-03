const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rffwydkwqvuxppkmewtc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmZnd5ZGt3cXZ1eHBwa21ld3RjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg5MTU0NjAsImV4cCI6MjA2NDQ5MTQ2MH0.vE1kLxN__C12j-yRhI-gk3Z6gOfJi6q157J5dGD2nUg'

const supabase = createClient(supabaseUrl, supabaseKey)

async function createTable() {
  // Criando a tabela de testes usando SQL bruto para maior controle
  const { data, error } = await supabase
    .from('rpc')
    .select('*')
    .rpc('execute_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS tests (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          name VARCHAR(255) NOT NULL,
          description TEXT,
          status VARCHAR(50) CHECK (status IN ('pending', 'running', 'passed', 'failed')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW()),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('UTC'::text, NOW())
        );

        -- Adicionando políticas RLS
        ALTER TABLE tests ENABLE ROW LEVEL SECURITY;

        -- Criando política para permitir leitura para usuários autenticados
        CREATE POLICY "Allow read for authenticated users" 
        ON tests FOR SELECT 
        TO authenticated 
        USING (true);

        -- Criando política para permitir inserção/atualização para usuários autenticados
        CREATE POLICY "Allow insert/update for authenticated users" 
        ON tests FOR ALL 
        TO authenticated 
        USING (true) 
        WITH CHECK (true);
      `
    })

  if (error) {
    console.error('Error creating table:', error)
    return
  }

  console.log('Table created successfully!')
}

createTable()
