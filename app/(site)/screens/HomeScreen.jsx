// screens/HomeScreen.jsx
import React from 'react';
import Hero from '@sections/home/Hero';

// When we extract more sections, we’ll import them like:
import Services from '@sections/home/Services';
import Why from '@sections/home/Why';
import Locations from '@sections/home/Locations';
import Reviews from '@sections/home/Reviews';
import Faq from '@sections/home/Faq';
import ConvertBand from '@sections/home/ConvertBand';

export default function HomeScreen() {
    return (
        <main>
            <Hero
                title="Ātrs mobilo ierīču servisa centrs"
                subtitle={
                    <>
                        Remonts tajā pašā dienā. 90&nbsp;dienu garantija. Divas filiāles&nbsp;Rīgā: Domina un Spice Home.
                    </>
                }
                rating={{
                    value: 4.9,
                    count: 230,
                    sourceLabel: 'Google',
                    href: '#reviews',
                    ariaLabel: 'Google vērtējums 4.9 no 5, 230 atsauksmes',
                }}
                cta={{ label: 'Izvēlies ierīci', href: '#services' }}
                align="center"
                background="gradient"
            />
            <div id="services" />
            <Services />

            <Why />

            <Locations />

            <div id="reviews" />
            <Reviews />

            <Faq />

            <ConvertBand />

        </main>
    );
}
