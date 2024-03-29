        window.addEventListener('load', function() {
            console.clear();
            
            const accountAddress = web3.eth.accounts[0];
            
            if (typeof web3 !== 'undefined') {
                console.log('web3 is enabled');
                if (web3.currentProvider.isMetaMask === true) {
                    console.log('MetaMask is active');
                    if (!accountAddress) {
                        $('#feedback').html('<div class="alert alert-danger" role="alert"><strong>No Address detected!</strong> Kindly unlock your metamask account then <a href="" class="alert-link">refresh</a> this page to proceed.</div>');
                        return false;
                    }

                    if ($.fn.getNetworkName() !== 'ropsten') {
                        $('#feedback').html('<div class="alert alert-danger" role="alert"><strong>Wrong network detected!</strong> Kindly switch to Ropsten Test Network in your metamask then <a href="" class="alert-link">refresh</a> this page to proceed.</div>');
                        return false;
                    }

                } else {
                    console.log('web3 is not found');
                    $('#feedback').html('<div class="alert alert-danger" role="alert"><strong>Misssig Dependancy!</strong> Kindly install <a href="https://metamask.io/" target="_blank" class="alert-link">MetaMask</a> then <a href="" class="alert-link">refresh</a> this page to proceed.</div>');
                    return false;
                }
            } else {
                console.log('web3 is not found');
                $('#feedback').html('<div class="alert alert-danger" role="alert"><strong>Misssig Dependancy!</strong> Kindly install <a href="https://metamask.io/" target="_blank" class="alert-link">MetaMask</a> then <a href="" class="alert-link">refresh</a> this page to proceed.</div>');
                return false;
            }

            const instituteContractABI = [{"constant":false,"inputs":[{"name":"_name","type":"string"},{"name":"minimum_quorum","type":"uint256"},{"name":"election_period","type":"uint256"}],"name":"add_Institution","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"institute","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"registered_institutions","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"}];
            
            const instituteFactoryAddress = '0x8a13b4d8c96c8d6efb07512d9f149733e1971d0f';
            const instituteContractInstance = web3.eth.contract(instituteContractABI).at(instituteFactoryAddress);

            instituteContractInstance.registered_institutions((err, result) => {
                var numInstitutions = result.c[0];
                console.log('registered institutions',err,numInstitutions);
                
                const electionFactoryABI = [{"constant":false,"inputs":[{"name":"desc","type":"string"}],"name":"add_Election","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"Voter_Address","type":"address"},{"name":"first_name","type":"string"},{"name":"second_name","type":"string"},{"name":"surname","type":"string"},{"name":"id","type":"uint256"},{"name":"phone","type":"uint256"},{"name":"email","type":"string"}],"name":"addVoter","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"Voter_Address","type":"address"}],"name":"removeVoter","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"newPeriod","type":"uint256"}],"name":"resetPeriod","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"newQuorum","type":"uint256"}],"name":"resetQuorum","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"pic","type":"bytes32"}],"name":"setprofilepicture","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"newAdmin","type":"address"}],"name":"transferAdmin","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"inputs":[{"name":"name","type":"string"},{"name":"minimum_quorum","type":"uint256"},{"name":"election_period","type":"uint256"},{"name":"is_admin","type":"address"}],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"constant":true,"inputs":[],"name":"admin","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"elections_held","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"getEmail","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"getFirstName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"getID","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"getPhone","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"getprofilepic","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"getSecondName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"getSurName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"institutioName","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"test","type":"address"}],"name":"isVoter","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"numVoters","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"period","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"quorum","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"total_elections","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"voter","outputs":[{"name":"firstName","type":"string"},{"name":"secondName","type":"string"},{"name":"surName","type":"string"},{"name":"idNo","type":"uint256"},{"name":"phoneNo","type":"uint256"},{"name":"emailAddress","type":"string"},{"name":"isVoter","type":"bool"},{"name":"profilepicture","type":"bytes32"}],"payable":false,"type":"function","stateMutability":"view"}];
                
                const electionABI = [{"anonymous":false,"inputs":[{"indexed":false,"name":"candidateID","type":"uint256"}],"name":"AddedCandidate","type":"event"},{"constant":false,"inputs":[{"name":"vie_post","type":"string"},{"name":"candi","type":"address"}],"name":"addCandidate","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"define","type":"string"}],"name":"addPosition","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"inputs":[{"name":"Admin","type":"address"},{"name":"details","type":"string"}],"payable":false,"type":"constructor","stateMutability":"nonpayable"},{"constant":false,"inputs":[{"name":"vie_post","type":"string"},{"name":"candi","type":"address"}],"name":"vote","outputs":[],"payable":false,"type":"function","stateMutability":"nonpayable"},{"constant":true,"inputs":[{"name":"i","type":"uint256"},{"name":"k","type":"uint256"}],"name":"candidate_votes","outputs":[{"name":"y","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"i","type":"uint256"},{"name":"k","type":"uint256"}],"name":"candidateAddress","outputs":[{"name":"y","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"pot","type":"string"},{"name":"qq","type":"address"}],"name":"candiVotes","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"election_details","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"i","type":"uint256"},{"name":"k","type":"uint256"}],"name":"eligible_candidate","outputs":[{"name":"y","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"examine","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"i","type":"uint256"},{"name":"k","type":"address"}],"name":"has_Voted","outputs":[{"name":"y","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"pot","type":"string"},{"name":"qq","type":"address"}],"name":"hasVoted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"pot","type":"string"},{"name":"qq","type":"address"}],"name":"isCandy","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"leader","outputs":[{"name":"u","type":"address"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"leaderWins","outputs":[{"name":"g","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"ongoing","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"period","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"i","type":"uint256"}],"name":"position","outputs":[{"name":"z","type":"string"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"registered_categories","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"start_time","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[],"name":"structure_x","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"ie","type":"uint256"}],"name":"total_candi","outputs":[{"name":"i","type":"uint256"}],"payable":false,"type":"function","stateMutability":"view"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"vie_positions","outputs":[{"name":"name_position","type":"string"},{"name":"total_candi","type":"uint256"},{"name":"leader","type":"address"},{"name":"leaderWins","type":"bool"}],"payable":false,"type":"function","stateMutability":"view"}];
                
                for(var i = 0; i <= numInstitutions; i++){
                    
                    /*var callback = (function(electionFactoryAddress){
                        var electionFactoryInstance = web3.eth.contract(electionFactoryABI).at(electionFactoryAddress);
                        
                        var callback1 = (function(totalElections){
                            
                            for(var i = 0; i <= totalElections; totalElections++){
                                
                                var callback2 = (function(electionAddress){
                                    var electionInstance = web3.eth.contract(electionABI).at(electionAddress);
                                    isCandy(electionInstance);
                                })();
                                electionsHeld(index, callback2); 
                            }
                        })();
                        totalElections(electionFactoryInstance, callback1);
                    })();
                    institute(index, callback);*/
                    console.log('index');
        
                }
                
            });
            
            function institute(index, callback = '') {
                instituteContractInstance.institute(index, (err, electionFactoryAddress) => {
                    console.log('institute',err, electionFactoryAddress);  
                    if(callback) callback(electionFactoryAddress);
                });
            }
            
            function totalElections(electionFactoryInstance, callback = '') {
                electionFactoryInstance.total_elections((err, totalElections) => {
                    console.log('total elections:' ,err, totalElections); 
                    if(callback) callback(totalElections);
                });
            }
            
            function electionsHeld(index,electionFactoryInstance, callback = '') {
                electionFactoryInstance.elections_held(index, (err, electionAddress) => {
                    console.log('elections_held:', err, result); 
                    if(callback) callback(electionAddress);
                });
            }
            
            function isCandy(electionInstance, callback = '') {
                electionInstance.isCandy(0, accountAddress, (err, result) => {
                    console.log('is_candi:', err, result);   
                    if(callback) callback();
                });                
            }
            

        });