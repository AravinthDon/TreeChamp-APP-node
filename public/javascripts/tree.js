// $(function() {

//     // check for the treeid in the url Parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     var treeid;

//     console.log(urlParams);
    
//     var getURL = "http://aravichandiran01.lampt.eeecs.qub.ac.uk/treechamp/api/tree.php";
    
//     if(urlParams.has('treeid')) {
//         treeid = urlParams.get('treeid');
//     }

//     $.get(getURL, {treeid: treeid}, function(response) {
//         console.log(response);
//         if(response['status'] == "Success") {
//             buildTable(response['data'][0]);
//         } else if(response['status'] = "Error") {
//             console.log(response['message']);
//         }
//     });

//     function buildTable(tree) {
        
//         let tableString = 
//         `<table>` +
//         `<tr> <th> Tree Details </th></tr>` +
//         `<tr> <td> Tree Type </td> <td> ${tree['TreeType']}</td> </tr>` +
//         `<tr> <td> Species Type </td> <td> ${tree['SpeciesType']} </td> </tr>` +
//         `<tr> <td> Species </td> <td> ${tree['Species']} </td> </tr>` +
//         `<tr> <td> Age </td> <td> ${tree['Age']} </td> </tr>` +
//         `<tr> <td> Tree Surround </td> <td> ${tree['TreeSurround']} </td> </tr>` +        
//         `<tr> <td> Vigour </td> <td> ${tree['Vigour']} </td> </tr>` +
//         `<tr> <td> Condition </td> <td> ${tree['Condition']} </td> </tr>` +
//         `<tr> <td> Description </td> <td> ${tree['Description']} </td> </tr>` +
//         `<tr> <td> Diameter </td> <td> ${tree['Diameter']} (cms) </td> </tr>` +
//         `<tr> <td> Spread Radius </td> <td> ${tree['SpreadRadius']}(m) </td> </tr>` +
//         `<tr> <td> Height </td> <td> ${tree['Height']} (m) </td> </tr>` +
//         `</table>`;

//         $("#tree-detail").append(tableString);
//     }
// });

