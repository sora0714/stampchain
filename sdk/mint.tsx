import { Connection, PublicKey, Transaction, SystemProgram, sendAndConfirmTransaction } from "https://deno.land/x/solana_bundle/mod.ts";
// Example of minting SRC-20 tokens
async function mintSRC20Tokens(connection: Connection, payer: PublicKey, mintAuthority: PublicKey, amount: number) {
	// Create a new token account
	const tokenAccount = await Token.createAccount(connection, mint, payer, payer);
 
	// Mint tokens to the new account
	const mintTx = new Transaction().add(
		 Token.createMintToInstruction(
			 TOKEN_PROGRAM_ID,
			 mint,
			 tokenAccount,
			 mintAuthority,
			 [],
			 amount
		 )
	);
 
	// Sign and send the transaction
	const txid = await sendAndConfirmTransaction(connection, mintTx, [mintAuthority]);
	console.log("Minted tokens. Transaction ID:", txid);
 }
 // Example of deploying SRC-20 tokens
 async function deploySRC20Tokens(connection: Connection, payer: PublicKey, mintAuthority: PublicKey) {
	// Create a new mint
	const mint = await Token.createMint(
		 connection,
		 payer,
		 mintAuthority,
		 null,
		 9,
		 TOKEN_PROGRAM_ID
	);
 
	// Create a new token account
	const tokenAccount = await Token.createAccount(connection, mint, payer, payer);
 
	console.log("Deployed SRC-20 tokens. Mint:", mint.publicKey.toBase58(), "Token Account:", tokenAccount.publicKey.toBase58());
 }
