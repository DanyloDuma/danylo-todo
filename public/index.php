<!DOCTYPE html>
<html lang="pt-PT">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/style.css">

  <title>Home - Danylo-ToDo</title>
</head>



<body>
  <?php require __DIR__ . '/includes/header.php'; ?>

  <p>Caminho secreto: <a href="experimentos.html">Aqui</a></p>
  <p><a href="form.html">Formulário</a></p>

  <?php require __DIR__ . '/includes/footer.php'; ?>
</body>
<script>
  var pessoa = {
  nome: ["Bob", "Smith"],
  idade: 32,
  sexo: "masculino",
  interesses: ["música", "esquiar"],
  bio: function () {
    alert(
      this.nome[0] +
        " " +
        this.nome[1] +
        " tem " +
        this.idade +
        " anos de idade. Ele gosta de " +
        this.interesses[0] +
        " e " +
        this.interesses[1] +
        ".",
    );
  },
  saudacao: function () {
    alert("Oi! Eu sou " + this.nome[0] + ".");
  },
};
</script>
</html>