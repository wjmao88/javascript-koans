var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      var noMushroom = function(ing){
        return ing != "mushrooms";
      }

      var canEat = function(product){
        
        return !product.containsNuts && _(product.ingredients).all(noMushroom);
      }

      productsICanEat = _(products).filter(canEat);

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    
    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = _.range(1000)
      .filter(function(i){
        return i % 3 === 0 || i % 5 === 0;
      })
      .reduce(function(sum, n){
        return sum + n;
      });    /* try chaining range() and reduce() */

    expect(sum).toBe(233168);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };
    /* chain() together map(), flatten() and reduce() */
    var addIngredient = function(ingredientCount, ingredient){
      ingredientCount[ingredient] = (ingredientCount[ingredient] || 0) + 1;
      return ingredientCount;
    };

    ingredientCount = _(_(products).map(function(p){
      return p.ingredients;
    })).flatten().reduce(addIngredient, ingredientCount);

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {
    var lpf = function(number){
      var current = 2;
      while(current < number){
        while(number % current === 0){
          number = number/current; 
        }
        current++;
      }
      return current;
    };

    expect(lpf(600851475143)).toBe(6857);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var isPali = function(number){
      number = number + '';
      return number == number.split('').reverse().join('');
    }

    var largest = 0;

    _(_.range(999, 0, -1)).each(function(a){
      _(_.range(999, 0, -1)).each(function(b){
        if (isPali(a*b) && a*b > largest){
          largest = a*b;
        }
      })
    })
  
     expect(largest).toBe(906609);
   });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var divAll = function(upper){
      var primes = function(n){
        var primes = [2];
        var current = 2;
        var primeChecker = function(prime){
          return current%prime !== 0;
        };

        while (current < n){
          current++;
          if (_(primes).all(primeChecker)){
            primes.push(current);
          }    
        }
        return primes;
      };

      return _(primes(upper)).chain().map(function(prime){
        var product = prime;
        while(product <= upper){
          product = product * prime;
        }        
        return product/prime;
      }).reduce(function(p, n){
        return p * n;
      }, 1).value();
    };

    expect(divAll(20)).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var sos = function(upper){
      var arr = _.range(1, upper+1);
      var sum = _(arr).reduce(function(s, a){
          return s + a;
        }, 0);
    
      return _(arr).chain()
        .map(function(a){
          return a*a
        }).reduce(function(s, a){
          return s + a
        }, 0).value() - sum*sum;
    }
    expect(sos(100)).toBe(-25164150);
  });

  it("should find the 10001st prime", function () {
    var nthPrime = function(n){
      var primes = [2];
      var current = 2;
      var primeChecker = function(prime){
        return current%prime !== 0;
      };

      while (primes.length < n){
        current++;
        if (_(primes).all(primeChecker)){
          primes.push(current);
        }    
      }
      return current;
    };
    expect(nthPrime(10001)).toBe(104743);
  });
});
