function format(price)
{
    var formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
      });
      
    return formatter.format(price); 

}