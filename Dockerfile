FROM node:18

WORKDIR /app

# Copiar apenas package.json e package-lock.json primeiro para cache de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código fonte
COPY . .

# Expor a porta da aplicação
EXPOSE 3000

# Manter o container rodando sem fazer nada para permitir desenvolvimento/testes
# Isso é útil para testar a conectividade e configuração do Docker Compose
CMD ["tail", "-f", "/dev/null"]