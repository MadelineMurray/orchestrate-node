import Orchestrate from '../../src'

// Test for generating many wallets
(async () => {
    try {
        //Init Orchestrate
        const orch = new Orchestrate()

        // Test SDK with SSL_SASL communication
        // const options = {
        //     sasl: {
        //         mechanism: 'plain',
        //         username: 'worker',
        //         password: 'worker-secret'
        //     },
        //     sslOptions: {
        //       rejectUnauthorized: false
        //     }
        // }
        // const broker = orch.broker('localhost:9092', options)

        // Init broker to connect to a kafka borker
        const broker = orch.broker('localhost:9092')

        // Init class to generate wallets, produce, consume messages transactions envelopes
        const producer = await broker.producer()
        const consumer = await broker.consumer()
        const walletGenerator = await broker.walletGenerator()

        const consume = consumer.consume()

        consume.on('message', message => {
            console.log('Message consumed: ', message)
        })
        
        producer.send({
            chainId: '888',
            to: '0xe5ce65038f9d1c841a33cc816ee674f8a0e31e74',
            call: {
                // contract: 'SimpleToken',
                // method: 'constructor()'
                method: 'transfer(address,uint256)',
                args: ["dbb881a51cd4023e4400cef3ef73046743f08da3", "100000"]
            },
            gas: 2000000,
            from: '0x7e654d251da770a068413677967f6d3ea2fea9e4'
        })

        // Generate wallets and get addresses
        const wallets = await Promise.all([
            walletGenerator.generate(),
            walletGenerator.generate(),
            walletGenerator.generate(),
            walletGenerator.generate(),
            walletGenerator.generate(),
            walletGenerator.generate(),
            walletGenerator.generate()
        ])
        console.log(wallets)
    } catch (e) {
        console.error(e)
    }
})()
