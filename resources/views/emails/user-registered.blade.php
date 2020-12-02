<h1>Olá, {{$user->name}}m tudo bem? Espero que sim! </h1>

<h2>Obrigado por sua inscrição!</h2>

<p>
    Faça bom proveito e excelentes compras em nosso marcketplace! <br>
    Seu email de cadastro é: <strong>{{$user->email}}</strong>
</p>
<hr>
Email enviado em {{date('d/m/Y H:i:s')}}.