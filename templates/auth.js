html
meta(charset='utf8')
form(action="https://money.yandex.ru/oauth/authorize" method="POST") 
  input(type="hidden" name="client_id" value=client_id)
  input(type="hidden" name="response_type" value='code')
  input(type="hidden" name="redirect_uri" value=redirect_uri)
  input(type="hidden" name="scope" value=scope)
  button(type='submit') Авторизовать бота