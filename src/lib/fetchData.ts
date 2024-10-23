import { APIResponse, ImageDetails, ImageFilters, ImageItem, ResponseData } from './models';

const apiKey = process.env.NEXT_PUBLIC_MUSEUM_API_KEY


export async function getImages(filters?: ImageFilters) {
    try {
        const url = `https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&involvedMaker=${encodeURIComponent(filters?.artist ?? '')}&format=json&imgonly=True&ps=20`;
        const req = await fetch(url);
        const res = await req.json();

        if (!res) throw new Error('Error Occured While Fetching Data');

        if (res.count === 0) throw new Error('No Data Found');


        const images: ImageItem[] = res.artObjects.map((artObject: any) => {
            const item = {
                id: artObject.id,
                title: artObject.title,
                data: {
                    url: artObject.webImage.url,
                    width: artObject.webImage.width,
                    height: artObject.webImage.height
                }
            }

            return item
        })

        const responseData: ResponseData = { count: res.count, artObjects: images }

        return { success: true, message: "Images Fetched Successfully", data: responseData } as APIResponse
    }
    catch (error) {
        console.log("Error Occured While Fetching Images", error)
        return { success: false, message: "Error while fetching images", data: null } as APIResponse
    }
}



export async function getImageInfo(imageId: string) {
        const url = `https://www.rijksmuseum.nl/api/nl/collection/${imageId.replace('nl-', '')}?key=${apiKey}&format=json`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des détails de l\'œuvre');
            }
            const data = await response.json();

            const details : ImageDetails = {
                title: data.artObject.title,
                artist: data.artObject.principalMaker,
                description: data.artObject.plaqueDescriptionEnglish || 'Unavailable Description',
                dating: data.artObject.dating.presentingDate || 'Unknown Date', 
                placeOfCreation: data.artObject.productionPlaces[0] || 'Unknown Place',
                size_weight: data.artObject.subTitle
            };

            return details;
        } catch (error) {
            console.log("Error Occured While Fetching Image Info :", error)
            return null;
        }
}