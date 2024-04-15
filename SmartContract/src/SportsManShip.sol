// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SportsManShip{
//struct to define item details
struct Player{
    uint  playerId;
    string playerName;
    address playerOwner;
    string playerUrl;
    string playerYears;
    string sportsType;
    uint playerPrice;
    uint playerExperienceRate;
    bool  isBid;


}
//item index
uint256 playerIndex;

//mapping a uint to item
mapping(uint => Player)public players;

//function AddItem
function createPlayer(string memory _playerName,string memory _playerURL,string memory _playerYear,string memory _playerSportsType,uint256 _playerPrice,uint _playerExperienceRate)external{
    uint newItemIndex = playerIndex;
    players[newItemIndex] = Player({playerId:newItemIndex,playerName:_playerName,playerOwner:msg.sender,playerUrl:_playerURL,playerYears:_playerYear,sportsType:_playerSportsType, playerPrice:_playerPrice,playerExperienceRate:_playerExperienceRate,isBid:false});
    
    playerIndex ++;

}

//function all readItem

function getAllPlayers()public view returns(Player[] memory play ){
   //Player[] memory items = new Player[](itemIndex); or this way
   play = new Player[](playerIndex);

    for(uint i=0;i < playerIndex;++i){
        play[i] = players[i];
    }
    return play;
}


// read myitems
function getUsePlayers(address _ownerAddress)public view returns(Player[] memory plays ){
    uint count=0;
    for (uint i=0;i <playerIndex;++i){
        if(players[i].playerOwner == _ownerAddress){
            count ++;

        }
    }

     plays = new Player[](count);
    uint index=0;

    for(uint i=0; i < playerIndex;++i){
        if(players[i].playerOwner == _ownerAddress){
            plays[index] = players[i];
            index ++;

        }

    }
    return plays;

   
}

//function to delete an item

// Function to delete an item
    function removePlayer(uint256 index) public {
        require(index <= playerIndex, "Index out of bounds");
        require(players[index].playerOwner == msg.sender, "You are not the owner of this item");

        // Shift items in the mapping to fill the gap left by the deleted item
        for (uint i = index; i < playerIndex - 1; i++) {
            players[i] = players[i + 1];
        }
        
        // Delete the last item in the mapping
        delete players[playerIndex - 1];
        
        // Decrement itemIndex
        playerIndex --;
    }

    //function buy item

    function bidPlayer(uint _index)public payable {
        // require(msg.value >= amount,"no amout");
        players[_index].isBid = true;
    }
}