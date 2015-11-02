(function () {
  Game = function (ball, player, comp) {
    this.ball = ball;
    this.player = player;
    this.comp = comp;
  };

  Game.prototype.animate = function () {
    this.detectCollisions();

    this.player.updatePos();
    this.comp.move(ballMesh);

    this.ball.updatePos();
    this.ball.spin();

    requestAnimationFrame(this.animate.bind(this));
    renderer.render(scene, camera);
  };

  Game.prototype.detectCollisions = function () {
    this.detectCollisionX();
    this.detectCollisionY();
    this.detectCollisionZ();
  };

  Game.prototype.detectCollisionX = function () {
    if (ballMesh.position.x <= leftWallMesh.position.x + radius) {
      this.ball.ballMesh.position.x = leftWallMesh.position.x + radius;
      this.ball.speedX *= -1;
    } else if (ballMesh.position.x >= rightWallMesh.position.x - radius) {
      this.ball.ballMesh.position.x = rightWallMesh.position.x - radius;
      this.ball.speedX *= -1;
    }
  };

  Game.prototype.detectCollisionY = function () {
    if (ballMesh.position.y <= floorMesh.position.y + radius) {
      this.ball.ballMesh.position.y = floorMesh.position.y + radius;
      this.ball.speedY *= -1;
    } else if (ballMesh.position.y >= ceilingMesh.position.y - radius) {
      this.ball.ballMesh.position.y = ceilingMesh.position.y - radius;
      this.ball.speedY *= -1;
    }
  };

  Game.prototype.detectCollisionZ = function () {
    if (ballMesh.position.z < -distance + radius) {
      if (this.checkPaddleCollision(-1)) {
        this.ball.ballMesh.position.z = -distance + radius;
        this.ball.speedZ *= -1;
        this.getCompPaddleSpeed();
      } else {
        this.stopPlay();
      }
    } else if (ballMesh.position.z > -radius) {
      if (this.checkPaddleCollision(1)) {
        this.ball.ballMesh.position.z = -radius;
        this.ball.speedZ *= -1;
        this.getPlayerPaddleSpeed();
      } else {
        this.stopPlay();
      }
    }
  };

  Game.prototype.checkPaddleCollision = function (dir) {
    if (this.ball.dead) return;

    var points = ball.getCollisionPoints();
    var vectorDir = new THREE.Vector3();
    vectorDir.z = 1 * dir;
    for (var i = 0; i < points.length; i++) {
      var raycaster = new THREE.Raycaster(points[i], vectorDir);
      var intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        return true;
      }
    }
    return false;
  };

  Game.prototype.getCompPaddleSpeed = function () {
    var oldX = this.comp.paddleMesh.position.x;
    var oldY = this.comp.paddleMesh.position.y;
    setTimeout(function () {
      this.ball.updateSpin(oldX, oldY, this.comp.paddleMesh);
    }.bind(this), 0);
  };

  Game.prototype.getPlayerPaddleSpeed = function () {
    var oldX = this.player.paddleMesh.position.x;
    var oldY = this.player.paddleMesh.position.y;
    setTimeout(function () {
      this.ball.updateSpin(oldX, oldY, this.player.paddleMesh);
    }.bind(this), 0);
  };

  Game.prototype.startPlay = function () {
    this.ball.start();
    this.comp.canMove = true;
  };

  Game.prototype.stopPlay = function () {
    this.ball.stop();
    this.comp.canMove = false;
    setTimeout(function () {
      this.ball.reset();
      this.comp.resetPos();
    }.bind(this), 1000);
  };
})();