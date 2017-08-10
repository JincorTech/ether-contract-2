# Ethereum Smart-contract development. Lesson 2

After we install all dependencies we need to create a new `*.sol` file with custom token’s smart-contract code. As I said in previous lesson I will call my token "JCR".
Solidity is a quite new and dynamically growing language and it leads to frequent updates with breaking changes. To avoid compilation by incompatible compiler we should specify which compile version to use by using `pragma solidity` I will use version “caret(^)“ `0.4.11` which means that newer minor versions and bugfixes are also OK for us. It is possible to specify much more complex rules for the compiler version, the expression follows those used by npm.

As I said before we are going to use some contracts from open-zeppelin to not to reinvent the wheel again and use some safe and well-tested patterns already build by well-known experts and audited by open zeppelin.

To import a contract from open-zeppelin just use the `import` command and write down the path of the contract you are importing like I did. I recommend you to take a look at the open-zeppelin’s documentation and inspect the source code of the contracts and libraries you are going to use in order to get a good understanding on how it actually works and some examples of good and clean Solidity contracts code. You can find open-zeppelin source files in your `node_modules` folder.

Let’s go there and check Mintable token contract which I’m going to use today. We will not dive into it too deep because you can check the source code without my help so I will just note the most basic and important things.

We see that Mintable token is Ownable, Standard token. Note that `is` keyword means almost the same thing as `extends` in PHP or Java. You can note that this contract adds 2 events, one public property, 2 modifiers and 2 functions. All this adds minting functionality to Standard token. Standard token adds functionality of spending tokens on some other addresses behalf.  The tokens owner should allow this operation and specified allowed amount first. And the Basic token is just an implementation of ERC20Basic interface which makes  it possible to check balances and transfer tokens. Ownable contract adds onlyOwner modifier which is used to protect contract methods from calling by 3rd-parties and provides a method to transfer ownership with onlyOwner modifier.

Lets go back to our contract’s source code and make some modifications. After we imported all contracts we need, we can define new contract using contract keyword like you already seen in the other `*.sol` files. Please, use the same names for contracts and sourcefiles.
We will define public accessable name, symbol and number of decimals which is going to be equal 18 like in Ethereum.

The next thing to do is to write  the code of constructor. Constructor is just a function which is called during the contract instance creation. Good place to put initialization code of your tokens. I would like to have a contract which will allow me to specify the amount of tokens I want to distribute so I add an argument with the number of tokens I want to get and then call the ‘mint’ function. It will create specified amount of tokens on the creator’s wallet.

Lets try to compile our contract and see what’s we get there! Do you remember how to compile? Just type truffle compile in project’s root!

Now let’s check our build folder! Here we can see all the build artifacts of the contracts we used from ERC20 to Mintable token and JCR. Build artifacts are stored in JSON files. That json-files contains the name of the contract, Application Binary Interface definition(ABI), unlinked binary sting which will be used by Ethereum Virtual Machine and some other info.

We can use this artifacts to deploy contracts to network manually but it’s better to automate this process from the beginning by writing migration script. Lets go to 2_deploy_contracts.js file and add some migrations code. Do you remember that we must specify the amount of tokens we want to distribute in token’s constructor? Migration is a good place to do this. I’d like to distribute 1 million 4 hundred thousands tokens.
Note that when we provide token amounts(including ethereum) in smart-contracts, we use Wei. Wei is the minimal unit. 1 ether is 10 ^ 18 wei. Note that we used 18 as a decimals amount in token contract. Ethereum web3 library already has built-in function which will convert the values for us so we will just use it.
We can deploy contracts in migration scripts using deployer.deploy function. Pass build artifacts as a first argument and constructor arguments in the correct order as the next arguments and it will do everything for you. In order to deploy contracts using migrations you can unlock your account in the network. To unlock first account in testrpc just type `testrpc -u 0`

Lets try to run our new migration and see if it works.


Cool! Now we want to make sure that our token behaves as expected. To do this we will write test on JavaScript and Solidity. Type `truffle create test` and the name of your contract you want to test. It will generate javascript test file.
I hope you have some experience in writing unit tests in any other programming languages. If you have experience with Mocha and Chai you are already familliar with tests in truffle because it uses this technologies to provide testing functionality. You can find more information in truffle’s official documentation.
In our case lets just ensure that the owner of the token contract has the correct balance after contract deployment and token transfers works as expected.
