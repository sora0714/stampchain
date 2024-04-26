async function transferSRC20Tokens(connection: Connection, payer: PublicKey, from: PublicKey, to: PublicKey, amount: number) {
	// Create a transfer instruction
	const transferTx = new Transaction().add(
		 Token.createTransferInstruction(
			 TOKEN_PROGRAM_ID,
			 from,
			 to,
			 payer,
			 [],
			 amount
		 )
	);
 
	// Sign and send the transaction
	const txid = await sendAndConfirmTransaction(connection, transferTx, [payer]);
	console.log("Transferred tokens. Transaction ID:", txid)