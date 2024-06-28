type CashinCallback = (amount: number) => void;
type PurchaseCallback = (result: boolean) => void;
type DisplayCallback = (message: string) => void;
type VendCallback = (result: boolean) => void;

const emulator = {
  StartCashin: function (cb: CashinCallback) {
    const handleKeyPress = (e: KeyboardEvent) => {
      const amounts = {
        '1': 1,
        '5': 5,
        '0': 10,
        '2': 50,
        '3': 100,
        '4': 500,
        '6': 1000,
      };
      if (e.key in amounts) {
        console.log(`Accepted cash: ${amounts[e.key as keyof typeof amounts]}₽`);
        cb(amounts[e.key as keyof typeof amounts]);
      }
    };
    console.log('Cashin started');
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      console.log('Cashin stopped');
      window.removeEventListener('keydown', handleKeyPress);
    };
  },
  StopCashin: function () {
    console.log('Cashin manually stopped');
    window.removeEventListener('keydown', () => {});
  },
  BankCardPurchase: function (amount: number, cb: PurchaseCallback, display_cb: DisplayCallback) {
    console.log(`Starting card purchase for amount: ${amount}₽`);
    display_cb('Приложите карту');

    const handleSuccess = () => {
      display_cb('Оплата прошла успешно');
      console.log('Card purchase result: success');
      cb(true);
      window.removeEventListener('keydown', handleKeyPress);
    };

    const handleFailure = () => {
      display_cb('Ошибка оплаты');
      console.log('Card purchase result: failure');
      cb(false);
      window.removeEventListener('keydown', handleKeyPress);
    };

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 's') {
        handleSuccess();
      } else if (e.key === 'f') {
        handleFailure();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    setTimeout(() => {
      display_cb('Обработка карты');
      setTimeout(() => {
        display_cb('Связь с банком');
        console.log('Press "s" for success or "f" for failure');
      }, 2000);
    }, 2000);
  },
  BankCardCancel: function () {
    console.log('Card purchase canceled');
    window.dispatchEvent(new CustomEvent('cancel'));
  },
  Vend: function (product_idx: number, cb: VendCallback) {
    console.log(`Starting vend for product index: ${product_idx}`);

    setTimeout(() => {
      console.log('Vend process ongoing...');
      console.log('Vend result: success');
      cb(true);
    }, 3000);
  }
};

export default emulator;
