const { Gateway, Wallets } = require('fabric-network');
const { buildCCPOrg1, buildWallet } = require('../../../../test-application/javascript/AppUtil.js');
const path = require('path');
const { getPrivateKey } = require('../helper/getPrivKey.js');

let pkey;
const org1SROuser = 'SROuser';


exports.gatewayFunction = async () => {
    const gateway = new Gateway();
    try {
        const walletPath = path.join(__dirname, '../../wallet');
        const wallet = await buildWallet(Wallets, walletPath);
        const ccp = buildCCPOrg1();
        await gateway.connect(ccp, {
            wallet,
            identity: org1SROuser,
            discovery: { enabled: true, asLocalhost: true }
        });
        const identity = await wallet.get(org1SROuser)
        pkey = await getPrivateKey(identity)
    } finally {
        gateway.disconnect();
    }
    return pkey
}