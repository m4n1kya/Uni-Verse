import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Star, Clock, ShoppingBag, CreditCard, X, Plus, Minus, UtensilsCrossed, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import cardFood from "@/assets/card-food-realistic.png";
import vendorMayuri from "@/assets/vendor-mayuri.png";
import vendorBistro from "@/assets/vendor-bistro.png";
import vendorUnderbelly from "@/assets/vendor-underbelly.png";
import vendorDakshin from "@/assets/vendor-dakshin.png";

const vendors = [
  {
    id: 1,
    name: "Mayuri",
    image: vendorMayuri,
    type: "South Indian & Fast Meals",
    rating: 4.5,
    deliveryTime: "15-20 min",
    menu: [
      { id: 1, name: "Masala Dosa", price: 70, isSpecial: true },
      { id: 2, name: "Idli Sambar", price: 40, isSpecial: false },
      { id: 3, name: "Medu Vada", price: 45, isSpecial: false },
      { id: 4, name: "Onion Uttapam", price: 80, isSpecial: true },
      { id: 5, name: "Filter Coffee", price: 25, isSpecial: false },
      { id: 6, name: "Pongal", price: 50, isSpecial: false },
      { id: 7, name: "Rava Dosa", price: 75, isSpecial: false },
      { id: 8, name: "Ghee Roast", price: 90, isSpecial: true },
    ],
  },
  {
    id: 2,
    name: "Bistro",
    image: vendorBistro,
    type: "Continental & Shakes",
    rating: 4.3,
    deliveryTime: "20-25 min",
    menu: [
      { id: 1, name: "Cheese Burger", price: 110, isSpecial: true },
      { id: 2, name: "Peri Peri Fries", price: 80, isSpecial: false },
      { id: 3, name: "Alfredo Pasta", price: 150, isSpecial: true },
      { id: 4, name: "Club Sandwich", price: 90, isSpecial: false },
      { id: 5, name: "Oreo Shake", price: 120, isSpecial: false },
      { id: 6, name: "Chicken Wings", price: 140, isSpecial: true },
      { id: 7, name: "Caesar Salad", price: 130, isSpecial: false },
      { id: 8, name: "Iced Tea", price: 60, isSpecial: false },
    ],
  },
  {
    id: 3,
    name: "UnderBelly",
    image: vendorUnderbelly,
    type: "Pan-Asian & Bowls",
    rating: 4.2,
    deliveryTime: "15-20 min",
    menu: [
      { id: 1, name: "Chicken Momos", price: 90, isSpecial: true },
      { id: 2, name: "Veg Hakka Noodles", price: 100, isSpecial: false },
      { id: 3, name: "Chilli Chicken", price: 140, isSpecial: true },
      { id: 4, name: "Spring Rolls", price: 80, isSpecial: false },
      { id: 5, name: "Fried Rice", price: 110, isSpecial: false },
      { id: 6, name: "Manchurian", price: 120, isSpecial: false },
      { id: 7, name: "Veg Steam Momos", price: 70, isSpecial: false },
      { id: 8, name: "Schezwan Noodles", price: 100, isSpecial: true },
    ],
  },
  {
    id: 4,
    name: "AB Dakshin",
    image: vendorDakshin,
    type: "Authentic Andhra & Biryani",
    rating: 4.4,
    deliveryTime: "10-25 min",
    menu: [
      { id: 1, name: "Hyderabadi Biryani", price: 180, isSpecial: true },
      { id: 2, name: "Kerala Parotta", price: 40, isSpecial: false },
      { id: 3, name: "Chicken Chettinad", price: 160, isSpecial: true },
      { id: 4, name: "Veg Thali", price: 120, isSpecial: true },
      { id: 5, name: "Curd Rice", price: 60, isSpecial: false },
      { id: 6, name: "Egg Curry", price: 80, isSpecial: false },
      { id: 7, name: "Chapati", price: 15, isSpecial: false },
      { id: 8, name: "Chicken 65", price: 140, isSpecial: true },
    ],
  },
];

const FoodCourt = () => {
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [cart, setCart] = useState<{ item: any; quantity: number }[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const addToCart = (item: any) => {
    const existing = cart.find((c) => c.item.id === item.id && c.item.name === item.name);
    if (existing) {
      setCart(cart.map((c) =>
        c.item.id === item.id && c.item.name === item.name
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ));
    } else {
      setCart([...cart, { item, quantity: 1 }]);
    }
  };

  const removeFromCart = (item: any) => {
    const existing = cart.find((c) => c.item.id === item.id && c.item.name === item.name);
    if (existing && existing.quantity > 1) {
      setCart(cart.map((c) =>
        c.item.id === item.id && c.item.name === item.name
          ? { ...c, quantity: c.quantity - 1 }
          : c
      ));
    } else {
      setCart(cart.filter((c) => !(c.item.id === item.id && c.item.name === item.name)));
    }
  };

  const totalAmount = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);

  return (
    <>
      <MainLayout>
        {/* Sleek Header */}
        <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
          <img src={cardFood} alt="Food Court" className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium text-xs uppercase tracking-wider">Campus Dining</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Campus <span className="gradient-text">Food Court</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">Live vendor menus, contactless student ordering & express pickup</p>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="p-4 md:p-6 mt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Featured Outlets
            </h2>
            <span className="text-xs text-muted-foreground font-medium">4 Outlets Open Now</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendors.map((vendor, index) => (
              <div
                key={vendor.id}
                onClick={() => setSelectedVendor(vendor)}
                className="sleek-card overflow-hidden cursor-pointer hover:border-primary/40 transition-all animate-fade-in group"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="h-32 bg-white/5 border-b border-white/5 flex items-center justify-center p-4 relative">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  />
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full text-xs font-semibold text-amber-400 border border-white/10">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{vendor.rating}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
                    {vendor.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{vendor.type}</p>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span className="text-xs font-medium">{vendor.deliveryTime}</span>
                    </div>
                    <span className="text-xs text-primary font-semibold group-hover:underline">
                      View Menu →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Specials */}
        <div className="px-4 md:px-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl tracking-tight">Today's Chef Specials 🔥</h2>
            <span className="text-xs text-muted-foreground font-medium">Freshly Made</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {vendors.flatMap((v) =>
              v.menu.filter((m) => m.isSpecial).map((item) => (
                <div
                  key={`${v.id}-${item.id}`}
                  className="sleek-card p-4 min-w-[220px] shrink-0 hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="glass-pill text-[10px] font-semibold text-primary mb-2">
                      {v.name}
                    </span>
                    <h3 className="font-semibold text-sm mt-1">{item.name}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
                    <span className="font-bold text-primary text-base">₹{item.price}</span>
                    <Button size="sm" className="rounded-xl h-8 px-3 text-xs shadow-sm shadow-primary/20" onClick={() => addToCart(item)}>
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Floating Cart Pill */}
        {cart.length > 0 && (
          <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-40 animate-slide-up-fade">
            <Button
              onClick={() => setShowPayment(true)}
              className="px-6 py-3 rounded-full shadow-2xl pulse-glow flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-semibold border border-white/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{cart.reduce((sum, c) => sum + c.quantity, 0)} items</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="font-bold">₹{totalAmount}</span>
            </Button>
          </div>
        )}

      </MainLayout>

      {/* Modern Vendor Menu Modal */}
      {selectedVendor && !showPayment && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-lg max-h-[82vh] overflow-y-auto animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl tracking-tight">{selectedVendor.name}</h2>
                  <p className="text-muted-foreground text-xs mt-0.5">{selectedVendor.type} • {selectedVendor.deliveryTime}</p>
                </div>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {selectedVendor.menu.map((item: any) => {
                  const cartItem = cart.find((c) => c.item.id === item.id && c.item.name === item.name);
                  return (
                    <div key={item.id} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:bg-white/[0.04] transition-all">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          {item.isSpecial && (
                            <span className="text-[10px] px-2 py-0.5 bg-amber-500/15 text-amber-400 border border-amber-500/25 rounded-full font-semibold">
                              Special
                            </span>
                          )}
                        </div>
                        <span className="text-primary font-bold text-sm mt-0.5 block">₹{item.price}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {cartItem ? (
                          <div className="flex items-center gap-1.5 bg-muted/50 rounded-xl p-1 border border-white/10">
                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg" onClick={() => removeFromCart(item)}>
                              <Minus className="w-3.5 h-3.5" />
                            </Button>
                            <span className="w-6 text-center font-bold text-xs">{cartItem.quantity}</span>
                            <Button size="icon" variant="ghost" className="h-7 w-7 rounded-lg" onClick={() => addToCart(item)}>
                              <Plus className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        ) : (
                          <Button size="sm" className="rounded-xl h-8 px-4 text-xs font-semibold shadow-sm shadow-primary/20" onClick={() => addToCart(item)}>
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-xs text-muted-foreground">Cart Subtotal:</span>
                  <p className="text-lg font-bold text-primary">₹{totalAmount}</p>
                </div>
                {cart.length > 0 && (
                  <Button className="rounded-xl px-5" onClick={() => setShowPayment(true)}>
                    Proceed to Checkout
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-md animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl tracking-tight">Express Checkout</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Contactless token issuance</p>
                </div>
                <button
                  onClick={() => setShowPayment(false)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="space-y-2.5 mb-6 max-h-48 overflow-y-auto scrollbar-hide">
                {cart.map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="flex-1">
                      <span className="font-semibold text-foreground">{c.item.name}</span>
                      <p className="text-[11px] text-muted-foreground">₹{c.item.price} × {c.quantity}</p>
                    </div>
                    <span className="font-bold text-primary">₹{c.item.price * c.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.08] pt-3 mb-5 flex justify-between items-center font-bold">
                <span className="text-sm">Total Payable</span>
                <span className="text-xl text-primary font-display">₹{totalAmount}</span>
              </div>

              {/* Payment Options */}
              <div className="space-y-2 mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Select Payment Mode</h3>
                {["UPI (Instant Token via PhonePe/GPay)", "Student Smart Card Balance", "Pay on Counter Pickup"].map((method, idx) => (
                  <div
                    key={method}
                    className="p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-primary/40 flex items-center gap-3 cursor-pointer transition-all"
                  >
                    <CreditCard className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground">{method}</span>
                    {idx === 0 && <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />}
                  </div>
                ))}
              </div>

              <Button className="w-full rounded-xl py-3 font-semibold text-sm shadow-lg shadow-primary/25" size="lg">
                Confirm & Pay ₹{totalAmount}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodCourt;
