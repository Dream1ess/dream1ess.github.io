const EXMO_WS_BASE_URL = `wss://ws-api.exmo.com:443/v1`;
const EXMO_WS_PUBLIC_URL = `${EXMO_WS_BASE_URL}/public`;

function createWSConnection(props) {
  return typeof WebSocket !== 'undefined' ? new WebSocket(props) : new WebSocketLib(props);
}

function createExmoWSConnection(url, messages) {
  const socket = createWSConnection(url);
  const onMessage = (event) => {
    let message = JSON.parse(event.data);
    let topic = message.topic.replace(/spot\/trades:/gm, '').trim().toLowerCase();
    console.log(topic);
    console.log(message);
  }
  const onClose = (event) => console.log('connection closed:', event);
  const onError = (error) => console.log('connection error:', error);
  const onInitialize = () => {
    console.log('connection opened');

    for (let message of messages) {
      console.log('sending:', message);
      socket.send(message);
    }
  };

  socket.onopen = () => onInitialize();
  socket.onmessage = (event) => onMessage(event);
  socket.onclose = (event) => onClose(event);
  socket.onerror = (error) => onError(error);
}

function connectExmoWSPublicApi() {
  const data = [
    '{"id":1,"method":"subscribe","topics":["spot/trades:USD_RUB", "spot/trades:USDT_RUB", "spot/trades:BTC_RUB", "spot/trades:LTC_RUB", "spot/trades:SHIB_RUB", "spot/trades:DOGE_USD", "spot/trades:USDT_USD", "spot/trades:USDT_EUR", "spot/trades:BTC_USD", "spot/trades:DOGE_EUR"]}',
  ];

  createExmoWSConnection(EXMO_WS_PUBLIC_URL, data);
}


connectExmoWSPublicApi();







// const pair = ["BTC_USDT","BTC_USD","BTC_EUR","BTC_GBP","BTC_UAH","ETH_USD","XRP_USD","BCH_USD","EOS_USD","LTC_USD","TRX_USD","ADA_BTC","ADA_USDT","ADA_USD","ALGO_BTC","ALGO_USDT","ALGO_RUB","ALGO_EUR","ATOM_BTC","ATOM_USD","ATOM_EUR","BCH_RUB","BCH_EUR","BCH_UAH","BCH_GBP","BCH_BTC","BCH_ETH","BCH_USDT","BTC_RUB","BTC_PLN","BTC_KZT","BTCV_BTC","BTG_USD","BTG_BTC","CHZ_BTC","CRON_BTC","CRON_ETH","CRON_USDT","DAI_USD","DAI_RUB","DAI_BTC","DAI_ETH","DASH_USD","DASH_RUB","DASH_UAH","DASH_BTC","DASH_USDT","DCR_BTC","DEBT_BTC","DEBT_ETH","DEBT_USDT","DOGE_USD","DOGE_BTC","DOGE_EUR","DOGE_GBP","DOT_BTC","DOT_USDT","DOT_USD","EOS_EUR","EOS_BTC","ETC_USD","ETC_RUB","ETC_BTC","ETC_USDT","ETH_USDT","ETH_BTC","ETH_EUR","ETH_GBP","ETH_RUB","ETH_UAH","ETH_PLN","ETH_KZT","ETH_LTC","EXM_BTC","EXM_ETH","EXM_USD","EXM_USDT","EXM_RUB","GAS_USD","GAS_BTC","GMT_BTC","GMT_USDT","GNY_BTC","GUSD_USD","GUSD_RUB","GUSD_BTC","IQN_BTC","IQN_USDT","HAI_BTC","LINK_BTC","LTC_RUB","LTC_EUR","LTC_UAH","LTC_GBP","LTC_BTC","MKR_BTC","MKR_DAI","MNC_USD","MNC_BTC","MNC_ETH","NEAR_BTC","NEAR_USDT","NEAR_USD","NEO_USD","NEO_RUB","NEO_BTC","OMG_USD","OMG_BTC","OMG_ETH","ONE_BTC","ONG_BTC","ONT_BTC","PRQ_BTC","PRQ_USDT","QTUM_USD","QTUM_BTC","QTUM_ETH","ROOBEE_BTC","SHIB_RUB","SHIB_BTC","ROOBEE_USDT","SHIB_USDT","SHIB_USD","SHIB_UAH","SMART_USD","SMART_RUB","SMART_EUR","SMART_BTC","SOL_BTC","SOL_USDT","TON_BTC","TON_USDT","TRX_EUR","TRX_RUB","TRX_UAH","TRX_BTC","UNI_BTC","USDC_USD","USDC_BTC","USDC_ETH","USDC_USDT","USDT_USD","USDT_RUB","USDT_EUR","USDT_PLN","USDT_GBP","USDT_UAH","USDT_KZT","VLX_BTC","WAVES_USD","WAVES_RUB","WAVES_BTC","WAVES_ETH","WXT_BTC","WXT_USDT","XEM_USD","XEM_EUR","XEM_UAH","XEM_BTC","XLM_USD","XLM_RUB","XLM_BTC","XRP_EUR","XRP_RUB","XRP_UAH","XRP_GBP","XRP_BTC","XRP_USDT","XRP_ETH","XTZ_USD","XTZ_RUB","XTZ_BTC","XYM_BTC","YFI_BTC","ZEC_USD","ZEC_RUB","ZEC_EUR","ZEC_BTC","ZRX_USD","ZRX_BTC","ZRX_ETH","USD_RUB","USD_UAH","SGB_BTC","EXFI_BTC","SOLO_BTC","UNI_USDT","YFI_USDT"];








