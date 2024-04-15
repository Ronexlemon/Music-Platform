// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MusicPlatform{
//struct to define item details
struct MusicCover{
    uint  artistId;
    string artistName;
    string artistSongName;
    address artistOwner;
    string artistUrl;
    string artistYears;
    string songType;
    uint artistPrice;
    string artistSongRate;
    bool  isReleased;


}
//item index
uint256 artistIndex;

//mapping a uint to item
mapping(uint => MusicCover)public artists;

//function AddItem
function createArtistCover(string memory _artistName,string memory _artistURL,string memory _artistYear,string memory _artistSongType,uint256 _artistPrice,string memory _artistSongRate,string memory _artistSongName)external{
    uint newItemIndex = artistIndex;
    artists[newItemIndex] = MusicCover({artistId:newItemIndex,artistName:_artistName,artistSongName:_artistSongName,artistOwner:msg.sender,artistUrl:_artistURL,artistYears:_artistYear,songType:_artistSongType, artistPrice:_artistPrice,artistSongRate:_artistSongRate,isReleased:false});
    
    artistIndex ++;

}

//function all readItem

function allArtists()public view returns(MusicCover[] memory music ){
   //artist[] memory items = new artist[](itemIndex); or this way
   music = new MusicCover[](artistIndex);

    for(uint i=0;i < artistIndex;++i){
        music[i] = artists[i];
    }
    return music;
}


// read 
function myArtists(address _ownerAddress)public view returns(MusicCover[] memory music ){
    uint count=0;
    for (uint i=0;i <artistIndex;++i){
        if(artists[i].artistOwner == _ownerAddress){
            count ++;

        }
    }

     music = new MusicCover[](count);
    uint index=0;

    for(uint i=0; i < artistIndex;++i){
        if(artists[i].artistOwner == _ownerAddress){
            music[index] = artists[i];
            index ++;

        }

    }
    return music;

   
}

//function to delete an item

// Function to delete an item
    function deleteArtistCover(uint256 index) public {
        require(index <= artistIndex, "Index out of bounds");
        require(artists[index].artistOwner == msg.sender, "You are not the owner of this item");

        // Shift items in the mapping to fill the gap left by the deleted item
        for (uint i = index; i < artistIndex - 1; i++) {
            artists[i] = artists[i + 1];
        }
        
        // Delete the last item in the mapping
        delete artists[artistIndex - 1];
        
        // Decrement itemIndex
        artistIndex --;
    }

    //function buy item

    function approveArtistReleased(uint _index)public payable {
        // require(msg.value >= amount,"no amout");
        artists[_index].isReleased = true;
    }
}