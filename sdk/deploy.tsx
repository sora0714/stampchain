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