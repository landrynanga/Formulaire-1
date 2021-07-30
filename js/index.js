/**
 * Devoir 2 programmation Web
 * Alexandre ANDZE KANDE, Landry NANGA MOLA, Mathias BASSAMA DIOUF
 */

var map;
//fonction pour activer l'api google
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
    });
}

$(document).ready(function (event) {
    //ref Dom///////////////////////////////
    var li1 = $('li#li1');
    var li2 = $('li#li2');
    var li3 = $('li#li3');
    var rowActivite = $('tr#row0 th:nth-child(2)');
    var rowResponsable = $('tr#row0 th:nth-child(3)');
    var rowNbInscrit = $('tr#row0 th:nth-child(4)');
    var sectionTextTableau = $('section#textTableau');
    var sectionFormulaire = $('section#formulaire');
    var divMap = $('#map');
    var buttonRemplirTableau = $('button#remplirTableau');
    var buttonEffacerTableau = $('button#effacerTableau');
    var tbody = $("tbody");
    var form = $('form');
    // end ref Dom///////////////////////////////////////
    
    
    var tabIsEmpty = true;

    var data=[{"order":1,"activity":"Natation","manager":"Michel Provencher","numofsub":7},

        {"order":2,"activity":"Badminton","manager":"Daniel Lefevbre","numofsub":15},

        {"order":3,"activity":"Randonnée","manager":"Catherine Pelletier","numofsub":10},

        {"order":4,"activity":"Kayak","manager":"Josée Coté","numofsub":14},

        {"order":5,"activity":"Velo","manager":"Jean-Yves Surroy","numofsub":22},

        {"order":6,"activity":"Echecs","manager":"Emilie Simard","numofsub":11}];

    //cacher les section
    hidenSections();
    //remplir le tqbleau
    remplirTableau();

    //event click background color sur accueil et affiche le text tableau
    li1.click(function () {
        backgroundColorAccueil();
        afficherTextTableau();
    });

    //event click background color sur s'inscrire et affiche le formulaire
    li2.click(function () {
        backgroundColorSincrire();
        afficherFormulaire();
    });

    //event click background color sur Localiser une activité et affiche google map
    li3.click(function () {
        backgroundColorLocaliserActivite();
        afficherMapGoogle();
    });

    //trier les activité
    rowActivite.click(function () {
        trierColonne("activity");
    });

    //trier les responsable
    rowResponsable.click(function () {
        trierColonne("manager");
    });

    //trier le nombre inscrit
    rowNbInscrit.click(function () {
        trierColonne("numofsub");
    });

    //button pour remplir le tableau
    buttonRemplirTableau.click(function () {
        remplirTableau();
    });
    //button pour effacer le tableau
    buttonEffacerTableau.click(function () {
        effacerTableau();
    });

    //verification du formulaire
    form.submit(function (event) {
        verifForm(event);
    });


    //Fonction pour changer la couleur de fond d'accueil
    function backgroundColorAccueil() {
        $(li1).addClass('backgroundColorClick');
        if(li2.hasClass('backgroundColorClick')){
            li2.removeClass('backgroundColorClick');
        }
        if(li3.hasClass('backgroundColorClick')){
            li3.removeClass('backgroundColorClick');
        }
    }

    //Fonction pour changer la couleur de fond de s'inscrire
    function backgroundColorSincrire() {
        $(li2).addClass('backgroundColorClick');
        if(li1.hasClass('backgroundColorClick')){
            li1.removeClass('backgroundColorClick');
        }
        if(li3.hasClass('backgroundColorClick')){
            li3.removeClass('backgroundColorClick');
        }
    }

    //Fonction pour changer la couleur de fond sur localiser
    function backgroundColorLocaliserActivite() {
        $(li3).addClass('backgroundColorClick');
        if(li1.hasClass('backgroundColorClick')){
            li1.removeClass('backgroundColorClick');
        }
        if(li2.hasClass('backgroundColorClick')){
            li2.removeClass('backgroundColorClick');
        }
    }

    //fonction pour afficher le text et le tableau
    function afficherTextTableau() {
        if(sectionTextTableau.is(":hidden")){
            if(!sectionFormulaire.is(":hidden")){
                sectionFormulaire.slideUp();
            }
            if(!divMap.is(":hidden")){
                divMap.slideUp();
            }
            sectionTextTableau.slideDown('slow');
        }
    }

    //fonction pour afficher les formulaire
    function afficherFormulaire() {
        var textarea = $('textarea').val('');
        if(sectionFormulaire.is(":hidden")){
            if(!sectionTextTableau.is(":hidden")){
                sectionTextTableau.slideUp();
            }
            if(!divMap.is(":hidden")){
                divMap.slideUp();
            }
            sectionFormulaire.slideDown('slow');
        }
    }

    //fonction pour afficher google map
    function afficherMapGoogle() {
        if(divMap.is(":hidden")){
            if(!sectionFormulaire.is(":hidden")){
                sectionFormulaire.slideUp();
            }
            if(!sectionTextTableau.is(":hidden")){
                sectionTextTableau.slideUp();
            }
            divMap.slideDown('slow');
        }
    }

    // fonction pour cacher les sections. On utilise le setTimeout pour que l'api google map a le temps de se charger
    function hidenSections() {
        setTimeout(function () {
            sectionFormulaire.hide();
            divMap.hide();
        }, 1000);
    }

    //fonction pour remplir le tableau
    function remplirTableau() {
        tabIsEmpty = false;
        tbody.empty();
        var html = "";
        data.forEach(function (element) {
            html = '<tr>' +
                '<th>' + element.order + '</th>' +
                '<td>' + element.activity + '</td>' +
                '<td>' + element.manager + '</td>' +
                '<td>' + element.numofsub + '</td>' +
                '</tr>';
            tbody.append(html);
        });
    }

    //fonction pour effacer le tableau
    function effacerTableau() {
        tabIsEmpty = true;
        tbody.empty();
    }

    //fonction pour trier la colonne selectione
    function trierColonne(colonne) {
        if(!tabIsEmpty){
            var tabTrier = tableauColonneTrier(colonne);
            var selectColonne;
            switch (colonne){
                case "activity":
                    selectColonne = $("tbody td:nth-child(2)");
                    tabTrier.forEach(function (element, index) {
                        selectColonne.get(index).innerHTML = element;
                    });
                    break;
                case "manager" :
                    selectColonne = $("tbody td:nth-child(3)");
                    tabTrier.forEach(function (element, index) {
                        selectColonne.get(index).innerHTML = element;
                    });
                    break;
                case "numofsub" :
                    selectColonne = $("tbody td:nth-child(4)");
                    tabTrier.forEach(function (element, index) {
                        selectColonne.get(index).innerHTML = element;
                    });
                    break;
            }
        }
    }

    //fonction qui cree un tableau trie pour une colonne selectionne
    function tableauColonneTrier(colonne) {
        var colonneTab = [];
        data.forEach(function (element) {
            colonneTab.push(element[colonne]);
        });
        if(colonne == "numofsub"){
            colonneTab.sort(function (a, b) {
                return a - b;
            });
        }else {
            colonneTab.sort();
        }
        return colonneTab;
    }


    //Fonction de verification du formulaire
    function verifForm(event) {
        //ref dom /////////////////////////////////////
        var inputPrenom = $('input:eq(0)').val();
        var inputNom = $('input:eq(1)').val();
        var inputUniversite = $('input:eq(2)').val();
        var inputDepartement= $('input:eq(3)').val();
        var textarea = $('textarea').val();
        var spanPrenom =  $('span.error:eq(0)');
        var spanNom = $('span.error:eq(1)');

        var spanUniversite = $('span.error:eq(2)');
        var spanDepartement = $('span.error:eq(3)');
        var spanTextarea = $('span.error:eq(4)');
        var spanValide = $('span.valide');
        // end ref dom///////////////////////////

        var ok = true;

        if(!inputPrenom.match(/^[a-zA-Z ]+$/) || inputPrenom.length > 60){
            spanPrenom.text('Erreur, doit contenir uniquement des lettres, ' +
                '60 caractéres maximum et ne dois pas être vide')
                .show().fadeOut(5000);
            event.preventDefault();
            ok =false;
        }

        if(!inputNom.match(/^[a-zA-Z ]+$/) || inputNom.length > 60){
            spanNom.text('Erreur, doit contenir uniquement des lettres, ' +
                '60 caractéres maximum et ne dois pas être vide')
                .show().fadeOut(5000);
            event.preventDefault();
            ok =false;
        }

        if(!inputUniversite.match(/^[a-zA-Z ]+$/) || inputUniversite.length > 60){
            spanUniversite.text('Erreur, doit contenir uniquement des lettres, ' +
                '60 caractéres maximum et ne dois pas être vide')
                .show().fadeOut(5000);
            event.preventDefault();
            ok =false;
        }

        if(inputDepartement.length > 60 || inputDepartement.length === 0){
            spanDepartement.text('60 caractéres maximum et ne dois pas être vide').show().fadeOut(5000);
            event.preventDefault();
            ok =false;
        }

        if(textarea.length > 600 || textarea.length === 0){
            spanTextarea.text('60 caractéres maximum et ne dois pas être vide').show().fadeOut(5000);
            event.preventDefault();
            ok =false;
        }

        if(ok === true){
            spanValide.text('Le formulaire est valide').show().fadeOut(8000);
            event.preventDefault();
        }
    }
});






