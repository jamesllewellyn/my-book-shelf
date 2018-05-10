<!DOCTYPE html>
<html class="has-navbar-fixed-top">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>My Bookcase</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script defer src="https://use.fontawesome.com/releases/v5.0.9/js/all.js"
            integrity="sha384-8iPTk2s/jMVj81dnzb/iFR2sdA7u06vHJyyLlAd4snFpCl/SnyUjRrbdJsw1pGIl"
            crossorigin="anonymous"></script>
    <link href="https://blokkfont-losgordos.netdna-ssl.com/v2/blokkfont.css" rel="stylesheet" type="text/css">
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app" class="full-height">
    <app-nav-bar></app-nav-bar>
    <div class="columns is-gapless full-height">
        <app-side-bar :user="user" :bookcase="bookcase"></app-side-bar>
        <div class="column is-10-desktop is-9-tablet full-height scrollable" ref="top">
            <div class="page">
                <transition name="fade" mode="out-in">
                    <router-view :key="$route.params.handle"></router-view>
                </transition>
            </div>
        </div>
    </div>
    <modal modal-name="shelfAdd" title="Create a New Shelf">
        <template slot="body">
            <shelf-add-modal></shelf-add-modal>
        </template>
    </modal>
    <modal modal-name="shelfUpdate" title="Update Shelf">
        <template slot="body">
            <shelf-update-modal></shelf-update-modal>
        </template>
    </modal>

    <modal modal-name="addToShelf" title="Choose a Shelf">
        <template slot="body">
            <add-to-shelf-modal></add-to-shelf-modal>
        </template>
    </modal>


    <modal modal-name="bookMoveShelf" title="Move To Another Shelf">
        <template slot="body">
            <book-move-shelf-modal></book-move-shelf-modal>
        </template>
    </modal>

    <modal modal-name="friendAddModal" title="Add Friend">
        <template slot="body">
            <add-friend-modal></add-friend-modal>
        </template>
    </modal>

    <modal modal-name="friendAcceptModal" title="Accept Friend Request">
        <template slot="body">
            <accept-friend-modal></accept-friend-modal>
        </template>
    </modal>

    <modal modal-name="userUpdateModal" title="Update User Details">
        <template slot="body">
            <user-update-modal></user-update-modal>
        </template>
    </modal>

    <are-you-sure-modal></are-you-sure-modal>
</div>
<script src="{{ mix('js/app.js') }}"></script>
</body>
</html>