import { Banknote, CreditCard, Bitcoin, Coins } from 'lucide-react';

interface PaymentMethodProps {
  icon: React.ReactNode;
  title: string;
  range: string;
  delay: number;
}

function PaymentMethod({ icon, title, range }: PaymentMethodProps) {
  return (
    <div className="bg-gray-800 border border-yellow-500/40 p-6 rounded-xl transition-all duration-300 hover:border-yellow-500 hover:shadow-[0_0_25px_rgba(234,179,8,0.25)] hover:scale-105 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
      <div className="flex flex-col items-center text-center relative z-10">
        <div className="mb-4 p-4 bg-gray-900 rounded-full border border-yellow-500/50 transition-all duration-300 group-hover:border-yellow-400">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-yellow-400 text-sm font-semibold">{range}</p>
      </div>
    </div>
  );
}

function Payment() {
  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="text-yellow-400">
            Payment Options
          </span>
        </h2>
        <p className="text-center text-gray-300 mb-16 text-lg">
          Flexible payment methods to suit your needs
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <PaymentMethod
            icon={<Banknote className="w-8 h-8 text-yellow-400" />}
            title="Bank Transfer"
            range="$350 - ∞"
            delay={0}
          />
          <PaymentMethod
            icon={<CreditCard className="w-8 h-8 text-yellow-400" />}
            title="Credit/Debit Card"
            range="$350 - ∞"
            delay={100}
          />
          <PaymentMethod
            icon={<Bitcoin className="w-8 h-8 text-yellow-400" />}
            title="Crypto (USDT)"
            range="$350 - ∞"
            delay={200}
          />
          <PaymentMethod
            icon={<Coins className="w-8 h-8 text-yellow-400" />}
            title="Robux"
            range="30K - ∞"
            delay={300}
          />
        </div>
      </div>
    </section>
  );
}

export default Payment;
