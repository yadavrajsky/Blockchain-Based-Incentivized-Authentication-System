async function main() {
    const authenticationServiceProvider = await ethers.getContractFactory("AuthenticationServiceProvider");
    const authenticationServiceDeploy = await authenticationServiceProvider.deploy(); 
    console.log("Contract Deployed to Address:", authenticationServiceDeploy.target);
}
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
