var JCR = artifacts.require("./JCR.sol");

contract('JCR', function(accounts) {
  it("should put 1 400 000 JCR in the first account", function() {
    return JCR.deployed().then(function(instance) {
      return instance.balanceOf.call(accounts[0]);
    }).then(function(balance) {
      console.log(web3.toWei(1400000, 'ether'))
      assert.equal(balance.valueOf(), 1400000 * (10**18), "1400000 wasn't in the first account");
    });
  });
  it("should send coin correctly", function() {
    var token;

    // Get initial balances of first and second account.
    var account_one = accounts[0];
    var account_two = accounts[1];

    var account_one_starting_balance;
    var account_two_starting_balance;
    var account_one_ending_balance;
    var account_two_ending_balance;

    var amount = 10;

    return JCR.deployed().then(function(instance) {
      token = instance;
      return token.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_starting_balance = balance.toNumber();
      return token.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_starting_balance = balance.toNumber();
      return token.transfer(account_two, amount, {from: account_one});
    }).then(function() {
      return token.balanceOf.call(account_one);
    }).then(function(balance) {
      account_one_ending_balance = balance.toNumber();
      return token.balanceOf.call(account_two);
    }).then(function(balance) {
      account_two_ending_balance = balance.toNumber();

      assert.equal(account_one_ending_balance, account_one_starting_balance - amount, "Amount wasn't correctly taken from the sender");
      assert.equal(account_two_ending_balance, account_two_starting_balance + amount, "Amount wasn't correctly sent to the receiver");
    });
  });
});
