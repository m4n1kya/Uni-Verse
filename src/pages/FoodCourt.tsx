import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Star, Clock, DollarSign, ShoppingBag, CreditCard, X, Plus, Minus } from "lucide-react";
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
    type: "South Indian",
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
    type: "Multi-cuisine",
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
    type: "Asian & Fast Food",
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
    type: "Authentic Andhra",
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
        {/* Header */}
        <div className="relative h-48 md:h-64 overflow-hidden">
          <img src={cardFood} alt="Food Court" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <div className="absolute bottom-6 left-6">
            <h1 className="font-display font-bold text-3xl md:text-4xl">
              Campus <span className="gradient-text">Food Court</span>
            </h1>
            <p className="text-muted-foreground mt-1">Delicious meals, just a tap away</p>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="p-4 md:p-6">
          <h2 className="font-display font-bold text-xl mb-4">Choose a Vendor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {vendors.map((vendor, index) => (
              <div
                key={vendor.id}
                onClick={() => setSelectedVendor(vendor)}
                className="glass-card overflow-hidden cursor-pointer hover:glow-orange transition-all animate-fade-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-32 bg-white flex items-center justify-center p-4">
                  <img
                    src={vendor.image}
                    alt={vendor.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {vendor.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{vendor.type}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium">{vendor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{vendor.deliveryTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Specials */}
        <div className="px-4 md:px-6 pb-6">
          <h2 className="font-display font-bold text-xl mb-4">Today's Specials 🔥</h2>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {vendors.flatMap((v) =>
              v.menu.filter((m) => m.isSpecial).map((item) => (
                <div
                  key={`${v.id}-${item.id}`}
                  className="glass-card p-4 min-w-[200px] shrink-0 hover:glow-orange transition-all"
                >
                  <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                    {v.name}
                  </span>
                  <h3 className="font-semibold mt-2">{item.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    <Button size="sm" onClick={() => addToCart(item)}>
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Cart Floating Button */}
        {cart.length > 0 && (
          <div className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-40">
            <Button
              onClick={() => setShowPayment(true)}
              className="px-6 py-3 rounded-full shadow-lg pulse-glow flex items-center gap-3"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>{cart.reduce((sum, c) => sum + c.quantity, 0)} items</span>
              <span className="font-bold">₹{totalAmount}</span>
            </Button>
          </div>
        )}

      </MainLayout>

      {/* Vendor Menu Modal */}
      {selectedVendor && !showPayment && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md max-h-[80vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl">{selectedVendor.name}</h2>
                  <p className="text-muted-foreground">{selectedVendor.type}</p>
                </div>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                {selectedVendor.menu.map((item: any) => {
                  const cartItem = cart.find((c) => c.item.id === item.id && c.item.name === item.name);
                  return (
                    <div key={item.id} className="glass-card p-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <span className="text-primary font-bold">₹{item.price}</span>
                        {item.isSpecial && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded-full">
                            Special
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {cartItem ? (
                          <>
                            <Button size="icon" variant="outline" onClick={() => removeFromCart(item)}>
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{cartItem.quantity}</span>
                            <Button size="icon" onClick={() => addToCart(item)}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </>
                        ) : (
                          <Button size="sm" onClick={() => addToCart(item)}>
                            Add
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md animate-scale-in">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-display font-bold text-2xl">Checkout</h2>
                <button
                  onClick={() => setShowPayment(false)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Order Summary */}
              <div className="space-y-3 mb-6">
                {cart.map((c, i) => (
                  <div key={i} className="flex justify-between items-center text-sm">
                    <div className="flex-1">
                      <span className="font-medium">{c.item.name}</span>
                      <p className="text-xs text-muted-foreground">₹{c.item.price} each</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => removeFromCart(c.item)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-4 text-center font-medium text-xs">{c.quantity}</span>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => addToCart(c.item)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <span className="font-bold w-12 text-right">₹{c.item.price * c.quantity}</span>
                    </div>
                  </div>
                ))}
                <div className="border-t border-border pt-3 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{totalAmount}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="space-y-3">
                <h3 className="font-semibold">Payment Method</h3>
                {["UPI (Google Pay, PhonePe)", "Card Payment", "Cash on Pickup"].map((method) => (
                  <div
                    key={method}
                    className="glass-card p-4 flex items-center gap-3 cursor-pointer hover:border-primary transition-colors"
                  >
                    <CreditCard className="w-5 h-5 text-primary" />
                    <span>{method}</span>
                  </div>
                ))}
              </div>

              <Button className="w-full mt-6" size="lg">
                Place Order - ₹{totalAmount}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodCourt;
