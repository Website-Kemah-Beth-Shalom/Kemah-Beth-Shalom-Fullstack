<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- tailwind link -->
    <style>
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');

        body {
            font-family: 'Open Sans', sans-serif;
        }

        .text-3xl {
            font-size: 1.875rem;
        }

        .text-xl {
            font-size: 1.25rem;
        }

        .text-blue-500 {
            color: #3b82f6;
        }
    </style>
</head>

<body>
    <h1 class="text-3xl text-blue-500">
        {{ $title }}
    </h1>
    <p class="text-xl text-gray-500">
        {{ $body }}
    </p>
</body>

</html>