import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  Star,
  Clock,
  ShoppingBag,
  CreditCard,
  X,
  Plus,
  Minus,
  UtensilsCrossed,
  Sparkles,
  CheckCircle2,
  Search,
  QrCode,
  Receipt,
  Trash2,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import cardFood from "@/assets/card-food-realistic.png";
import vendorMayuri from "@/assets/vendor-mayuri.png";
import vendorBistro from "@/assets/vendor-bistro.png";
import vendorUnderbelly from "@/assets/vendor-underbelly.png";
import vendorDakshin from "@/assets/vendor-dakshin.png";

export interface MenuItem {
  id: number;
  name: string;
  price: number;
  isSpecial: boolean;
  diet: "veg" | "non-veg" | "beverage";
}

export interface Vendor {
  id: number;
  name: string;
  image: string;
  type: string;
  rating: number;
  deliveryTime: string;
  counter: string;
  menu: MenuItem[];
}

export interface CartItem {
  item: MenuItem;
  vendorName: string;
  quantity: number;
}

export interface ConfirmedOrder {
  orderId: string;
  pickupPin: string;
  vendorNames: string[];
  items: CartItem[];
  totalAmount: number;
  paymentMethod: string;
  timestamp: string;
  prepTime: string;
}

const vendors: Vendor[] = [
  {
    id: 1,
    name: "Mayuri",
    image: vendorMayuri,
    type: "South Indian & Fast Meals",
    rating: 4.5,
    deliveryTime: "15-20 min",
    counter: "Counter 1 & 2 (Ground Floor)",
    menu: [
      { id: 1, name: "Masala Dosa", price: 70, isSpecial: true, diet: "veg" },
      { id: 2, name: "Idli Sambar (2 pcs)", price: 40, isSpecial: false, diet: "veg" },
      { id: 3, name: "Medu Vada (2 pcs)", price: 45, isSpecial: false, diet: "veg" },
      { id: 4, name: "Onion Uttapam", price: 80, isSpecial: true, diet: "veg" },
      { id: 5, name: "Filter Coffee", price: 25, isSpecial: false, diet: "beverage" },
      { id: 6, name: "Ghee Pongal", price: 50, isSpecial: false, diet: "veg" },
      { id: 7, name: "Rava Mysore Dosa", price: 75, isSpecial: false, diet: "veg" },
      { id: 8, name: "Ghee Roast Special", price: 90, isSpecial: true, diet: "veg" },
    ],
  },
  {
    id: 2,
    name: "Bistro",
    image: vendorBistro,
    type: "Continental, Burgers & Shakes",
    rating: 4.3,
    deliveryTime: "20-25 min",
    counter: "Counter 3 (Mezzanine)",
    menu: [
      { id: 1, name: "Crispy Cheese Burger", price: 110, isSpecial: true, diet: "veg" },
      { id: 2, name: "Peri Peri Fries", price: 80, isSpecial: false, diet: "veg" },
      { id: 3, name: "Alfredo Creamy Pasta", price: 150, isSpecial: true, diet: "veg" },
      { id: 4, name: "Grilled Club Sandwich", price: 90, isSpecial: false, diet: "veg" },
      { id: 5, name: "Thick Oreo Shake", price: 120, isSpecial: false, diet: "beverage" },
      { id: 6, name: "BBQ Chicken Wings", price: 140, isSpecial: true, diet: "non-veg" },
      { id: 7, name: "Classic Caesar Salad", price: 130, isSpecial: false, diet: "veg" },
      { id: 8, name: "Peach Iced Tea", price: 60, isSpecial: false, diet: "beverage" },
    ],
  },
  {
    id: 3,
    name: "UnderBelly",
    image: vendorUnderbelly,
    type: "Pan-Asian & Street Bowls",
    rating: 4.2,
    deliveryTime: "15-20 min",
    counter: "Counter 4 (Central Plaza)",
    menu: [
      { id: 1, name: "Steamed Chicken Momos (6 pcs)", price: 90, isSpecial: true, diet: "non-veg" },
      { id: 2, name: "Veg Hakka Noodles", price: 100, isSpecial: false, diet: "veg" },
      { id: 3, name: "Wok Chilli Chicken", price: 140, isSpecial: true, diet: "non-veg" },
      { id: 4, name: "Crispy Spring Rolls", price: 80, isSpecial: false, diet: "veg" },
      { id: 5, name: "Egg Fried Rice", price: 110, isSpecial: false, diet: "non-veg" },
      { id: 6, name: "Veg Manchurian Bowl", price: 120, isSpecial: false, diet: "veg" },
      { id: 7, name: "Corn & Cheese Momos", price: 70, isSpecial: false, diet: "veg" },
      { id: 8, name: "Spicy Schezwan Noodles", price: 100, isSpecial: true, diet: "veg" },
    ],
  },
  {
    id: 4,
    name: "AB Dakshin",
    image: vendorDakshin,
    type: "Authentic Andhra & Biryani",
    rating: 4.4,
    deliveryTime: "10-25 min",
    counter: "Counter 5 (Dining Hall West)",
    menu: [
      { id: 1, name: "Hyderabadi Chicken Biryani", price: 180, isSpecial: true, diet: "non-veg" },
      { id: 2, name: "Malabar Parotta (2 pcs)", price: 40, isSpecial: false, diet: "veg" },
      { id: 3, name: "Chicken Chettinad Gravy", price: 160, isSpecial: true, diet: "non-veg" },
      { id: 4, name: "Andhra Special Veg Thali", price: 120, isSpecial: true, diet: "veg" },
      { id: 5, name: "Tadka Curd Rice", price: 60, isSpecial: false, diet: "veg" },
      { id: 6, name: "Egg Curry Masala", price: 80, isSpecial: false, diet: "non-veg" },
      { id: 7, name: "Wheat Chapati (2 pcs)", price: 15, isSpecial: false, diet: "veg" },
      { id: 8, name: "Crispy Chicken 65", price: 140, isSpecial: true, diet: "non-veg" },
    ],
  },
];

const dietFilters = ["All Items", "Veg Only", "Non-Veg", "Specials", "Beverages"] as const;
type DietFilterType = typeof dietFilters[number];

const FoodCourt = () => {
  const { toast } = useToast();
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("UPI (PhonePe/GPay)");
  const [activeDietFilter, setActiveDietFilter] = useState<DietFilterType>("All Items");
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null);

  const addToCart = (item: MenuItem, vendorName: string) => {
    const existingIndex = cart.findIndex(
      (c) => c.item.id === item.id && c.item.name === item.name && c.vendorName === vendorName
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      setCart(updated);
    } else {
      setCart([...cart, { item, vendorName, quantity: 1 }]);
    }

    toast({
      title: "Added to Cart",
      description: `${item.name} (${vendorName}) added.`,
    });
  };

  const removeFromCart = (item: MenuItem, vendorName: string) => {
    const existingIndex = cart.findIndex(
      (c) => c.item.id === item.id && c.item.name === item.name && c.vendorName === vendorName
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      if (updated[existingIndex].quantity > 1) {
        updated[existingIndex].quantity -= 1;
        setCart(updated);
      } else {
        setCart(cart.filter((_, idx) => idx !== existingIndex));
      }
    }
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart Emptied",
      description: "All items removed from your order tray.",
    });
  };

  const totalAmount = cart.reduce((sum, c) => sum + c.item.price * c.quantity, 0);
  const totalItemsCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const handleConfirmPayment = () => {
    if (cart.length === 0) return;

    const uniqueVendors = Array.from(new Set(cart.map((c) => c.vendorName)));
    const randomTokenNumber = Math.floor(100 + Math.random() * 900);
    const randomPin = Math.floor(10 + Math.random() * 90);

    const newOrder: ConfirmedOrder = {
      orderId: `TK-${randomTokenNumber}`,
      pickupPin: `${randomPin}`,
      vendorNames: uniqueVendors,
      items: [...cart],
      totalAmount,
      paymentMethod: selectedPaymentMethod,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      prepTime: "12-15 mins",
    };

    setConfirmedOrder(newOrder);
    setShowPayment(false);
    setSelectedVendor(null);
    setCart([]);

    toast({
      title: "Order Placed Successfully! 🎟️",
      description: `Token #${newOrder.orderId} issued. Collect at ${newOrder.vendorNames.join(", ")}.`,
    });
  };

  // Filter items for Chef's Specials rail
  const chefSpecials = vendors.flatMap((v) =>
    v.menu
      .filter((m) => m.isSpecial)
      .map((item) => ({ ...item, vendorName: v.name }))
  );

  return (
    <>
      <MainLayout>
        {/* Sleek Header */}
        <div className="relative h-52 md:h-68 overflow-hidden rounded-b-3xl border-b border-white/[0.08]">
          <img
            src={cardFood}
            alt="Food Court"
            className="w-full h-full object-cover brightness-[0.6] contrast-[1.1] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-6 left-6 md:left-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-primary font-medium text-xs uppercase tracking-wider">Campus Dining Hub</span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl tracking-tight">
              Campus <span className="gradient-text">Food Court</span>
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">
              Live vendor menus, contactless student token issuance & express pickup
            </p>
          </div>
        </div>

        {/* Global Search and Dietary Filters */}
        <section className="px-4 md:px-6 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {dietFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveDietFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border whitespace-nowrap ${
                    activeDietFilter === filter
                      ? "bg-primary text-primary-foreground border-primary shadow-sm shadow-primary/25"
                      : "bg-white/[0.03] text-muted-foreground border-white/10 hover:border-white/20 hover:text-foreground"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search food, snack or dish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 rounded-xl text-xs bg-white/[0.03] border-white/10 focus-visible:ring-primary/40"
              />
            </div>
          </div>
        </section>

        {/* Featured Outlets Grid */}
        <div className="p-4 md:p-6 pt-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl tracking-tight flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary" />
              Featured Campus Outlets
            </h2>
            <span className="text-xs text-muted-foreground font-medium">4 Outlets Serving Now</span>
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
                      View Menu ({vendor.menu.length}) →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Specials Rail */}
        <div className="px-4 md:px-6 pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-bold text-xl tracking-tight">Today's Chef Specials 🔥</h2>
            <span className="text-xs text-muted-foreground font-medium">Freshly Prepared</span>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
            {chefSpecials
              .filter(
                (item) =>
                  !searchQuery ||
                  item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.vendorName.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item) => (
                <div
                  key={`${item.vendorName}-${item.id}`}
                  className="sleek-card p-4 min-w-[230px] shrink-0 hover:border-primary/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="glass-pill text-[10px] font-semibold text-primary">
                        {item.vendorName}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                          item.diet === "veg"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : item.diet === "non-veg"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        }`}
                      >
                        {item.diet === "veg" ? "VEG" : item.diet === "non-veg" ? "NON-VEG" : "DRINK"}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mt-1">{item.name}</h3>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04]">
                    <span className="font-bold text-primary text-base">₹{item.price}</span>
                    <Button
                      size="sm"
                      className="rounded-xl h-8 px-3 text-xs shadow-sm shadow-primary/20"
                      onClick={() => addToCart(item, item.vendorName)}
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add
                    </Button>
                  </div>
                </div>
              ))}
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
              <span>{totalItemsCount} items</span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="font-bold">₹{totalAmount}</span>
            </Button>
          </div>
        )}
      </MainLayout>

      {/* Vendor Menu Modal */}
      {selectedVendor && !showPayment && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-lg max-h-[82vh] overflow-y-auto animate-scale-in border border-white/10 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-display font-bold text-2xl tracking-tight">{selectedVendor.name}</h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {selectedVendor.type} • {selectedVendor.deliveryTime}
                  </p>
                  <p className="text-[11px] text-primary font-medium mt-1">
                    Pickup: {selectedVendor.counter}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Menu Items List */}
              <div className="space-y-3">
                {selectedVendor.menu
                  .filter((m) => {
                    if (activeDietFilter === "Veg Only") return m.diet === "veg";
                    if (activeDietFilter === "Non-Veg") return m.diet === "non-veg";
                    if (activeDietFilter === "Specials") return m.isSpecial;
                    if (activeDietFilter === "Beverages") return m.diet === "beverage";
                    return true;
                  })
                  .map((item) => {
                    const cartItem = cart.find(
                      (c) => c.item.id === item.id && c.item.name === item.name && c.vendorName === selectedVendor.name
                    );

                    return (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between hover:border-white/10 transition-colors"
                      >
                        <div className="flex-1 pr-3">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                item.diet === "veg"
                                  ? "bg-emerald-400"
                                  : item.diet === "non-veg"
                                  ? "bg-rose-400"
                                  : "bg-amber-400"
                              }`}
                            />
                            <span className="font-semibold text-sm text-foreground">{item.name}</span>
                            {item.isSpecial && (
                              <span className="text-[10px] bg-primary/20 text-primary px-1.5 py-0.5 rounded font-semibold border border-primary/30">
                                Popular
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-bold text-primary block mt-1">₹{item.price}</span>
                        </div>

                        <div>
                          {cartItem ? (
                            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                              <button
                                onClick={() => removeFromCart(item, selectedVendor.name)}
                                className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-foreground transition-colors"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="text-xs font-bold px-2">{cartItem.quantity}</span>
                              <button
                                onClick={() => addToCart(item, selectedVendor.name)}
                                className="w-7 h-7 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ) : (
                            <Button
                              size="sm"
                              className="rounded-xl h-8 px-4 text-xs font-semibold shadow-sm shadow-primary/20"
                              onClick={() => addToCart(item, selectedVendor.name)}
                            >
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
                  <span className="text-xs text-muted-foreground">Cart Total ({totalItemsCount} items):</span>
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

      {/* Express Checkout Modal */}
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Order Items</span>
                <button
                  onClick={clearCart}
                  className="text-[11px] text-rose-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Clear Tray
                </button>
              </div>

              <div className="space-y-2 mb-6 max-h-48 overflow-y-auto scrollbar-hide">
                {cart.map((c, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]"
                  >
                    <div className="flex-1">
                      <span className="font-semibold text-foreground">{c.item.name}</span>
                      <p className="text-[11px] text-muted-foreground">
                        {c.vendorName} • ₹{c.item.price} × {c.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-primary">₹{c.item.price * c.quantity}</span>
                      <button
                        onClick={() => removeFromCart(c.item, c.vendorName)}
                        className="text-muted-foreground hover:text-rose-400 p-1"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/[0.08] pt-3 mb-5 flex justify-between items-center font-bold">
                <span className="text-sm">Total Payable</span>
                <span className="text-xl text-primary font-display">₹{totalAmount}</span>
              </div>

              {/* Payment Options */}
              <div className="space-y-2 mb-6">
                <h3 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  Select Payment Mode
                </h3>
                {[
                  "UPI (PhonePe/GPay)",
                  "Student Smart Card Balance",
                  "Pay at Counter Pickup",
                ].map((method) => (
                  <div
                    key={method}
                    onClick={() => setSelectedPaymentMethod(method)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      selectedPaymentMethod === method
                        ? "border-primary bg-primary/10 shadow-sm"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20"
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs font-medium text-foreground">{method}</span>
                    {selectedPaymentMethod === method && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />
                    )}
                  </div>
                ))}
              </div>

              <Button
                onClick={handleConfirmPayment}
                className="w-full rounded-xl py-3 font-semibold text-sm shadow-lg shadow-primary/25"
                size="lg"
              >
                Confirm & Pay ₹{totalAmount}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modern Digital Token Receipt Modal */}
      {confirmedOrder && (
        <div className="fixed inset-0 z-[9999] bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="sleek-card w-full max-w-md animate-scale-in border border-primary/30 shadow-2xl bg-card/95 backdrop-blur-2xl">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-lg tracking-tight">Order Confirmed!</h2>
                    <p className="text-[11px] text-muted-foreground">{confirmedOrder.timestamp} • Contactless</p>
                  </div>
                </div>
                <button
                  onClick={() => setConfirmedOrder(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Big Token Display Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-transparent border border-primary/25 text-center my-4">
                <span className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Express Pickup Token
                </span>
                <div className="text-4xl font-display font-extrabold text-primary my-1 tracking-tight">
                  #{confirmedOrder.orderId}
                </div>
                <p className="text-xs text-muted-foreground">
                  Counter Verification PIN: <strong className="text-foreground font-mono">{confirmedOrder.pickupPin}</strong>
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mt-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Est. Prep Time: {confirmedOrder.prepTime}</span>
                </div>
              </div>

              {/* Token Details */}
              <div className="space-y-2 text-xs mb-5 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Outlets:</span>
                  <span className="font-semibold text-foreground">{confirmedOrder.vendorNames.join(", ")}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Payment Method:</span>
                  <span className="font-medium text-foreground">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Total Paid:</span>
                  <span className="font-bold text-primary">₹{confirmedOrder.totalAmount}</span>
                </div>
              </div>

              {/* Item Summary */}
              <div className="mb-5 max-h-32 overflow-y-auto scrollbar-hide space-y-1.5">
                {confirmedOrder.items.map((c, idx) => (
                  <div key={idx} className="flex justify-between text-xs py-1 border-b border-white/[0.03]">
                    <span className="text-muted-foreground">{c.item.name} × {c.quantity}</span>
                    <span className="font-semibold text-foreground">₹{c.item.price * c.quantity}</span>
                  </div>
                ))}
              </div>

              <Button
                onClick={() => setConfirmedOrder(null)}
                className="w-full rounded-xl py-2.5 font-semibold text-xs shadow-md shadow-primary/25"
              >
                Close & Return to Dining
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FoodCourt;
