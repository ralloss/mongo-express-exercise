$(document).ready(function () {
  fetchData();

  $(".row")
    .off("click", ".btnSubmit")
    .on("click", ".btnSubmit", function () {
      const item = {
        product: $("#product").val(),
        description: $("#description").val(),
        cost: $("#cost").val(),
        quantity: $("#quantity").val(),
      };

      // console.log($('.btnSubmit').val(), item);
      createItem(item);

      return false;
    });
});

function createItem(item) {
  $.ajax({
    url: "http://localhost:3000/api/product/create",
    type: "post",
    data: item,
    dataType: "JSON",
    // encode: true,
  }).done(function (response) {
    // console.log(">>", response);

    let data = response.data;
    let status = response.status;

    if (status) {
      console.log(true, "Επιτυχής εισαγωγή του προϊόντος");
      alert(true, "Επιτυχής εισαγωγή του προϊόντος");
      $("#frmUser")[0].reset();
    } else {
      console.log(
        false,
        "Πρόβλημα στην εισαγωγή του προϊόντος (" + data.message + ")"
      );
      alert(
        false,
        "Πρόβλημα στην εισαγωγή του προϊόντος (" + data.message + ")"
      );
      //$('#frmUser')[0].reset();
      // console.log(data.message);
    }
  });
}

function fetchData() {
  $.ajax({
    url: "http://localhost:3000/api/product/findall",
    type: "get",
    dataType: "JSON",
  }).done(function (response) {
    // console.log(">>", response);
    let data = response.data;
    let status = response.status;

    if (status) {
      createTbody(data);
    } else {
      alert(
        false,
        "Πρόβλημα στην αναζήτηση των προϊόντων (" + data.message + ")"
      );
      // console.log(data);
    }
  });
}

function createTbody(data) {
  $("#userTable > tbody").empty();

  // console.log("CreateTBody", data);
  const len = data.length;
  for (let i = 0; i < len; i++) {
    const { _id, product, description, cost, quantity } = data[i];

    let tr_str =
      "<tr>" +
      "<td>" +
      product +
      "</td>" +
      "<td>" +
      description +
      "</td>" +
      "<td>" +
      cost +
      "</td>" +
      "<td>" +
      quantity +
      "</td>" +
      "<td>" +
      "<button class='btnUpdate btn btn-primary' data-id='" +
      _id +
      "'>Τροποποίηση</button> " +
      "<button class='btnDelete btn btn-primary' data-id='" +
      _id +
      "'>Διαγραφή</button>" +
      "</td>" +
      "</tr>";

    $("#userTable tbody").append(tr_str);
  }
  $(".btnDelete").on("click", function () {
    deleteItem(this.dataset.id);
  });
}

function deleteItem(id) {
  $.ajax({
    url: "http://localhost:3000/api/product/delete/" + id,
    type: "delete",
    dataType: "JSON",
    // encode: true,
  }).done(function (response) {
    console.log(">>", response);

    let data = response.data;
    let status = response.status;

    if (status) {
      const btn = $(`.btnUpdate[data-id=${id}]`);
      btn
        .parent()
        .parent("tr")
        .fadeOut(200, function () {
          this.remove();
          alertShort(true, "Επιτυχής διαγραφή του προϊόντος");
          console.log(true, "Επιτυχής διαγραφή του προϊόντος");
        });
    } else {
      console.log(
        false,
        "Πρόβλημα στην διαγραφή του προϊόντος (" + data.message + ")"
      );
      alertShort(
        false,
        "Πρόβλημα στην διαγραφή του προϊόντος (" + data.message + ")"
      );
    }
  });
}

function alert(status, message) {
  if (status) {
    $(".alert").addClass("alert-success");
    $(".alert").removeClass("alert-danger");
  } else {
    $(".alert").addClass("alert-danger");
    $(".alert").removeClass("alert-success");
  }
  $(".alert").html(message);
}

function alertShort(status, message, duration = 2000) {
  $(".alert").removeClass("alert-danger alert-success");
  $(".alert")
    .addClass(status ? "alert-success" : "alert-danger")
    .text(message);

  setTimeout(() => {
    $(".alert").removeClass("alert-danger alert-success");
    $(".alert").text("");
  }, duration);
}
