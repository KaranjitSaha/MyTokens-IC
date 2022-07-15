import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token{
    let owner: Principal = Principal.fromText("xfepp-tfbdv-ehg5m-54k42-mrhib-vpmar-i66ww-s4tnk-4jf3v-r5jf6-5qe");
    let totalSupply=1000000000;
    let symbol : Text = "DK";
    
    stable var balanceEntries : [(Principal, Nat)]=[];
    var balances = HashMap.HashMap<Principal, Nat>(1,Principal.equal,Principal.hash); // function attributes are like (starting size, , equality checker, the hashing method )
    
    if(balances.size() < 1){
            balances.put(owner,totalSupply);
    };// If somebody is running the project for the first time then neither the system preupgrade nor the system postupgrade will work. Hence this if statement is here

    public query func balanceOf(who : Principal) : async Nat{
        let balance = switch (balances.get(who)){
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text{
        return "DK";
    };

    public shared(msg) func payOut() : async Text{
        Debug.print(debug_show(msg.caller));
        if(balances.get(msg.caller) == null){
            var result = await transfer(msg.caller,10000);
            return result;
        }
        else{
            return "Already got the free tokens";
        };
    };

    public shared(msg) func transfer (to : Principal, amount : Nat ) : async Text { // We didnt use from: Principal since 'from' we can get using shared(msg)
        let receiverBalance = await balanceOf(to);
        let senderBalance : Nat = await balanceOf(msg.caller);
        if(senderBalance>=amount){
            balances.put(to,receiverBalance+amount);
            balances.put(msg.caller, senderBalance-amount);
            return "Success";
        }
        else{
            return "Insufficient funds";
        }
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal,Nat>(balanceEntries.vals(),1,Principal.equal,Principal.hash);
        if(balances.size() < 1){
            balances.put(owner,totalSupply);
        }//So that if no owner is created till now then we want to give all tokens to the owner
    };

}